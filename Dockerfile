FROM node:latest

WORKDIR /server

ADD . .

RUN yarn install

ENV NODE_MODULES_CACHE false
ENV PORT 80

EXPOSE 80

CMD ["yarn", "start"]
