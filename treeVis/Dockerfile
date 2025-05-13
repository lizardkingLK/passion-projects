FROM nginx:alpine
CMD npm install
CMD npm run build
COPY ./dist /usr/share/nginx/html
EXPOSE 5432