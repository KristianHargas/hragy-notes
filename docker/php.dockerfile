FROM php:7.4-fpm-alpine

WORKDIR /var/www/html

# If not commented, then project snapshot is also included in the final image.
# But during development it is mirrored anyway.
# COPY src .

RUN docker-php-ext-install pdo pdo_mysql

# www-data is the default user and he has no permissions to write there.
# Required only when using image data only, not bind mounts.
# Image data are read only by default (propably only root can change them).
# This is propably the user which handled php interpretation when invoked by nginx.
# RUN chown -R www-data:www-data /var/www/html

# This fixex the error when for example: php artisan make:controller command createt root files.
# Also for some reason removes permission error for writing logs.
# Group and user ID match local linux user (id -u; id -g).
RUN addgroup -g 1000 user
RUN adduser -D -g '' --u 1000 -G user user
RUN chown -R user:user /var/www/html
USER user