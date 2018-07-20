FROM keymetrics/pm2:8-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN ls -al -R
EXPOSE 3000
ENV NODE_ENV production
CMD ["pm2-runtime","start", "pm2.json"]