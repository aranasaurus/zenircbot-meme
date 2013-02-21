MemeCaptain API
===============

This is a simple Sinatra app that wraps the [meme_captain](https://github.com/mmb/meme_captain) gem.

To run this using passenger, create an nginx config block like the following:

---
  server {
    listen 80;
    server_name meme.loqi.me;

    root /web/zenircbot-meme/api/public;
    passenger_enabled on;

    location / {
      rewrite ^/([0-9a-zA-Z]+\.jpg)$ /m/$1 break;
    }
  }       
---

