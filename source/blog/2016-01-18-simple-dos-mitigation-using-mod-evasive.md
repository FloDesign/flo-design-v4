---
title:  "Super-simple Denial of Service mitigation using mod_evasive - Apache"
date:   2016-01-18 16:00:00
tags: Tutorials
time: 10
author: Craig
---

## What is a Denial of Service attack?

A Distributed Denial of Service (DDoS) attack is when an attacker floods a server with multiple requests from multiple IPs, usually from a number of different compromised machines within a botnet. These types of attacks can be difficult to protect against, especially when dealing with a sophisticated attack using multiple anonymous VPNs. To mitigate the effects of these attacks on your servers it is best to use a service such as [Cloudflare's anti-DDoS protection](https://www.cloudflare.com/ddos/). However, there are some steps you can take on your own server to stop script kiddies and other low-level threats from bringing your site down.

## Introducing mod_evasive

mod_evasive is an Apache module, which blacklists IP addresses for a set amount of time based on concurrent and sequential requests. This will usually take the form of multiple requests across a site within a certain time span or multiple requests to the same resource in quick succession. Here's how to set it up on Debian or Ubuntu.

We're assuming you have a LAMP-style setup already installed on your distro of choice. First, we'll get the mod_evasive package and install:

`sudo apt-get install libapache2-mod-evasive`

Once that's installed we need to configure our anti-DoS rules so mod_evasive knows when to blacklist an IP:

```
<IfModule mod_evasive20.c>
    DOSHashTableSize 3097

    # Email address that will receive a report when an IP is blacklisted
    DOSEmailNotify admin@example.com

    # Allow 3 requests for the same resource request per second. This is per-IP:
    DOSPageInterval 1
    DOSPageCount 3

    # Allow up to 50 requests across the domain per second. Per-IP:
    DOSSiteInterval 1
    DOSSiteCount 50

    # This is the length of time that the IP will be blocked for in seconds
    DOSBlockingPeriod 60

    #System command which will be executed when blocking an IP.
    DOSSystemCommand /home/user/ban_ip.sh
</IfModule>
```

Place this file into your Apache conf directory (usually `/etc/apache2/conf-available/`) in a file named 'evasive.conf' or similar.

Next, enable the module and the configuration:

`sudo a2enmod evasive && sudo a2enconf evasive`

and restart your Apache server:

`sudo service apache2 restart`

or

`sudo /etc/init.d/apache2 restart`

The last command `DDOSSystemCommand` can be used to execute a command each time an IP block is triggered. In this instance we'll run a script to add a rule to our iptables input chain. In our script directory (/home/user) add a file with the following:

```
#!/bin/sh
# Offending IP as detected by mod_evasive
IP=$1

# Path to iptables binary executed by user www-data through sudo
IPTABLES="/sbin/iptables"

# mod_evasive lock directory
MOD_EVASIVE_LOGDIR=/tmp

# Add the following firewall rule (block IP)
$IPTABLES -I INPUT -s $IP -j DROP

# Unblock offending IP after 2 hours through the 'at' command; see 'man at' for further details
echo "$IPTABLES -D INPUT -s $IP -j DROP" | at now + 2 hours

# Remove lock file for future checks
rm -f "$MOD_EVASIVE_LOGDIR"/dos-"$IP"
```
We need to make sure this script is runnable by the apache process user as a sudo command. First open up the sudoers editor 'visudo'

`sudo visudo`

then add the following:

`www-data ALL=(ALL) NOPASSWD: /home/craig/scripts/ban_ip.sh`

Substitute the name of your apache process user for www-data, if needed. Then save and exit.

Your server should now be protected from DoS attacks!