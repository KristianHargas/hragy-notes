FROM nginx:stable-alpine

# If not commented, then project snapshot is also included in the final image.
# But during development it is mirrored anyway.

# WORKDIR /etc/nginx/conf.d

# COPY nginx/nginx.conf .

# RUN mv nginx.conf default.conf

WORKDIR /var/www/html

# COPY src .