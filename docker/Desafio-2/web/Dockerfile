FROM nginx:1.25.0-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf  /etc/nginx/conf.d/

RUN mkdir -p /var/www/html

SHELL ["/bin/bash", "-c"]

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]
