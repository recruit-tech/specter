FROM nginx:1.17.9-alpine

RUN apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata

COPY ./nginx/nginx.template.conf /etc/nginx/nginx.template.conf
COPY ./nginx/static/ /app/static/

CMD sh -c "envsubst '\$BFF_HOST' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"
