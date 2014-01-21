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
 server_name subpath.example.com;
 rewrite ^/subpath(/.*)$ $1 last; // if deploying with context path
 location / {
   root /home/torquebox/railsapp/public;
   proxy_pass http://87.230.18.238:8080/subpath/;
   proxy_set_header   X-Real-IP        $remote_addr;
   proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
   proxy_set_header   Host $http_host;
 }
}
```

