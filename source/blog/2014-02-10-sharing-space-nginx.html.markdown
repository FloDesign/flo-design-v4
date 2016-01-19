---
title:  "Sharing space - Setting up Ghost behind a proxy - Nginx"
date:   2014-02-10 13:00:00
tags: Tutorials
time: 5
author: Craig
---

In my last blog post I explained how to set up a Ghost blog behind a proxy using Apache as the proxying server. This post is just a quickie to explain how to do the same with Nginx

If you haven't done so you can set up node.js and Ghost by following the [previous tutorial](http://blog.flodesign.co.uk/sharing-space-setting-up-ghost-behind-a-proxy-apache/)

### Step 1 - Locating your nginx install

If you've installed your nginx server recently or using your distro's package manager you'll likely have a good idea of where your nginx folder is. However, if you've compiled from source you might not have caught where it's been installed to. We'll be creating files in the 'sites-available' directory so first we'll find where that is:
  <pre>
  locate nginx/sites-available
  </pre>

The output of this command should give you the full path to your nginx install as well as any conf files in that directory. Within that directory we need to create a new .conf file to tell our server where to pass requests. Load up your favourite text editor and create a new file called ghost.conf:

  <pre>
  nano nginx-path/sites-available/ghost.conf
  </pre>

In this file we're going to put the following:
  <pre>
  server {
    listen 80;
    server_name example.com;

    location / {
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   Host      $http_host;
        proxy_pass         http://127.0.0.1:2368;
    }
  }
  </pre>

This file opens up a server block, which listens on the default HTTP port for incoming connections and sends the requests for example.com to our ghost install. Unlike Apache, we don't have to enable or set the proxy module as it is already enabled by default.

After that we need to enable our new site config in nginx:
  
  <pre>
  ln -s nginx-path/sites-available/ghost.conf nginx-path/sites-enabled/ghost.conf
  </pre>

Then just restart nginx and navigate to the domain you put in the server_name directive:

  <pre>
  service nginx restart
  </pre>

Et voila!

![Test Ghost blog up and running](http://i.imgur.com/qW27oDL.png)