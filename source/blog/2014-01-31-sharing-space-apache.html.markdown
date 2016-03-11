---
title:  "Sharing space - Setting up Ghost behind a proxy - Apache"
img: blog_img_ghost_apache.jpg
date:   2014-01-31 17:05:47
tags: Tutorials
time: 10
author: Craig
---

This week at Flo Design we've been playing around with Ghost, the node.js based blogging platform, on our VPS. Forefront.cc, our new domain for a Leeds-based meetup was the perfect candidate to try Ghost out in the wild but we had a small problem; our main Apache server was listening on port 80, blocking node.js from using that port, and we didn't want people to have to type in the port number to access the domain. The solution lay in Apache's ProxyPass directive.

    ProxyPass / http://localhost:2369/

This directive, when placed into the appropriate site config file, takes the root entry point (in our case forefront.cc) and passes it to our node.js server running on port 2368. This means we can run our node server in the background and not have to worry about visitors having to fiddle with port numbers. Simples!

Here's a step by step guide to setting up your very own Ghost blog behind a proxy:

This guide is for an Apache webserver running on Debian Linux, although other webservers and distros should be fairly similar. We'll assume you're running as root, if not then precede any commands which make changes outside your home folder with 'sudo'. 

### Step 1 - Installing Node

As previously mentioned Ghost runs as a node.js instance so we'll first need to install node. Depending on your distro you may be able to install node from your package manager (available in the Debian repo as of Debian Sid):

    apt-get install nodejs

If node isn't available from your package manager then you'll need to compile it from source. First we need to make sure we have the dependancies installed:

    apt-get install python g++ make checkinstall

Next we'll create a folder in our home directory to store the source and cd into it:

    mkdir ~/src && cd $_

Then get the latest source for node:

    wget -N http://nodejs.org/dist/node-latest.tar.gz

Unzip the file and cd into the created directory:

    tar xzvf node-latest.tar.gz && cd node-v*

Once we're in the created directory we need to configure the package:

    ./configure

Then we'll create a package file we can use to install node:

    checkinstall #

In the checkinstall dialog we need to remove the 'v' from the beginning of the version number so hit '3' and amend the version (v0.10.21 -> 0.10.21 at the time of writing).

Now it's time to install:

    dpkg -i node_*

To ensure everything has installed correctly we can check the version numbers:

    node -v
    npm -v

### Step 2 - Installing Ghost

Next up we need to get ghost running on our server. If you haven't already, go and sign up at http://ghost.org and login to your account. You'll see a button marked 'Download Ghost source code'. Click the button then Right-click and copy the link from the 'Download now' button. This way we can use wget to download the source to our server. Then in your terminal:

    cd ~ && wget --no-check-certificate <copied link goes here>

The Ghost download servers currently don't have a signed certificate so we'll bypass the check with the --no-check-certificate flag. We then need to unzip the file we've just downloaded, replacing the hashes with the version number:

    unzip -uo ghost-#.#.#.zip -d ghost && cd ghost

Then we install Ghost using the node package manager:

    npm install --production

Congratulations! You should now have a copy of Ghost installed on your server. Now to ensure it doesn't stop running as soon as we close our SSH session we need to get it running as a service.

### Step 3 - Running node.js as a service

There are numerous ways to ensure node runs when the SSH session is over but the simplest way I've found (and one of the ways suggested by Ghost in the install docs) is to run a process controller such as Supervisor. First off we need to install supervisor from our package manager:

    apt-get install supervisor

Once that's installed we need to create a config file for supervisor to run our instance of Ghost:

    nano /etc/supervisor/conf.d/ghost.conf

ghost.conf should contain the following:

    [program:ghost]
    command = node /path/to/ghost/index.js
    directory = /path/to/ghost
    user = username of choice 
    autostart = true
    autorestart = true
    stdout_logfile = /var/log/supervisor/ghost.log
    stderr_logfile = /var/log/supervisor/ghost_err.log
    environment = NODE_ENV="production"

Amend the command/directory paths and user to reflect your system config then save the file. Once back in the terminal we need to reload supervisor so it can see our new changes:

    supervisorctl reread

Then we can start our Ghost server:

    supervisorctl start ghost

We can also stop the server using supervisor, should we need to:

    supervisorctl stop ghost

We should now have an instance of Ghost happily chugging away to itself on localhost port 2368. Next up we need to route our incoming web traffic to our node server.

### Step 4 - Setting up the domain

Next we need to set up the domain you want the visitor to be accessing. In this example we're using forefront.cc. Our domain config file at /etc/apache2/sites-available/forefront.cc looks like this:

    LoadModule proxy_module /usr/lib/apache2/modules/mod_proxy.so
    LoadModule proxy_http_module /usr/lib/apache2/modules/mod_proxy_http.so

    NameVirtualHost *

    <VirtualHost *>
          ServerName forefront.cc

          ProxyPass / http://localhost:2368/
          ProxyPassReverse / http://localhost:2368/

    </VirtualHost>

Let's break it down a bit. Our first two lines ensure that the necessary modules are loaded in Apache so we can use it as a proxy.

    LoadModule proxy_module /usr/lib/apache2/modules/mod_proxy.so
    LoadModule proxy_http_module /usr/lib/apache2/modules/mod_proxy_http.so

The paths are the default locations for a Debian installation. Your paths may vary but you can edit them as needed. You can use the locate command to find the file path on your system:

    locate mod_proxy.so
    locate mod_proxy_http.so

Alternatively, you can leave these lines out and instead enable the mod straight from the CLI

    a2enmod proxy
    a2enmod proxy_http

Remember to restart your server to enable proxy support

    service apache2 restart
  or
    /etc/init.d/apache2 restart

Next up is our Vhost declaration.

    NameVirtualHost *

As we serve multiple domains from one VPS we use Named Vhosts to point to the correct folders. If you're not using named Vhosts then you won't need this line

On to the meat of our config!

    ServerName forefront.cc

ServerName ensures that the server knows which domain this config belongs to.

    ProxyPass / http://localhost:2369/
    ProxyPassReverse / http://localhost:2369/

Here's where the magic happens. We're telling our Apache server to route any traffic pointing at the route of our domain to the node server on port 2369. ProxyPassReverse ensures that any urls sent back to the user's browser are rewritten to be from our domain and not from localhost.

After that it's just a case of reloading our Apache configuration:

    service apache2 reload

You should now be able to see your Ghost blog at your configured domain!

{<1>}![Our Ghost blog in action](http://i.imgur.com/NuoO5YV.png)