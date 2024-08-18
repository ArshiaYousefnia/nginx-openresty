FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /tmp/static && chown -R nginx:nginx /tmp/static

EXPOSE 80
