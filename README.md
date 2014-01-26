# Rails4base

__A Rails 4 + AngularJS base app .__

__Status__: _Stable, In-Development._

__Dependencies__: _JRuby suggested (http://torquebox.org/) / Ruby supported._

## Overview

It provides:

* a structure of modern single page driven web apps to increase implementation quality for advanced user / micro interactions

* promises in frontend to hide latencies and to achieve rather small feedback loops

* registration/authentication using AngularJS and Devise for secure client and server side routing

* server side regexp matchings in Rails routes to control client side routing!

* Twitter Bootstrap 3+ integrated

In case of Torquebox:

* scaleable, clusterable

* easy maintainable / installable

What happened to the CSRF mechanisms, is it truly single page?

* Yes. If the CSRF token changes (see devise issues) rails will send back the new updated CSRF token in the response header. Upon the response received, Angular will re-update its default headers with the newly received token. However, because this mechanism is pure javascript based, the meta tag in the html rendered, which we used to receive the CSRF token on page reload and bootstrapping, will be outdated.

What follows:

* Torquebox features, such as realtime messaging between multi node servers and clients

## Setup

`rvm use jruby`

### development

`gem install torquebox-server`

(Do not include in Gemfile. Server side use binary package instead: http://torquebox.org/)

`torquebox run`

`torquebox deploy`

### production

* Installation of Torquebox binary package recommended, it comes with JRuby.

* Use Nginx or Apache as reverse proxy (see Apache's mod cluster: http://www.headlondon.com/our-thoughts/technology/posts/installing-torquebox-application-server-on-debian).

__No name collisions with rails apps!!!! great!!!__

```bundle
RAILS_ENV=production rake db:migrate
RAILS_ENV=production rake assets:precompile
```

Setting RAILS_RELATIVE_URL_ROOT is necessary if deploying to context path:
`RAILS_RELATIVE_URL_ROOT='/subpath' RAILS_ENV=production torquebox deploy --context-path='/subpath'`


### I prefer Ruby over JRuby.

Ruby is supported without Torquebox and its specific features. It definately should work until or around commit: `f7634f46b8d882fb496ab050fdffce4d028cf03c`

## Reverse proxy

Example Nginx config to use as reverse proxy:


```
server {
  listen 80;
  listen 443;
  ssl                  on;
  ssl_certificate      /etc/nginx/server.crt;
  ssl_certificate_key  /etc/nginx/server.key;
  server_name rails4base.sp33c.de;
  if ($server_port = 80) {
    rewrite ^ https://$host$request_uri permanent;
  }
  rewrite ^/rails4base(/.*)$ $1 last;
  location / {
    root /home/torquebox/rails4base/public;
    proxy_pass http://87.230.18.238:8080/rails4base/;
    proxy_set_header   X-Real-IP        $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    proxy_set_header   Host $http_host;
  }
}```

