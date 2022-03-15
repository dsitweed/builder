FROM node:14.15.5 as build

WORKDIR /app

# RUN npm install -g gatsby-cli

COPY package.json /app
RUN npm install --silent
COPY . /app
RUN npm run build

# prepare nginx
FROM nginx:1.19.8-alpine
COPY --from=build /app/build /var/www
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80   

ENTRYPOINT ["nginx","-g","daemon off;"]
