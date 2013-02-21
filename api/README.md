MemeCaptain API
===============

This is a simple Sinatra app that wraps the memecaptain gem.

To run this in passenger, create an nginx config block like the following:

---
  server {
    listen 80;
    server_name meme.loqi.me;

    root /web/zenircbot-meme/api/public;
    passenger_enabled on;

    location /memes/ {
      alias /web/zenircbot-meme/api/public/memes;
    }
  }       
---

