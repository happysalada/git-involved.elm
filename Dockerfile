FROM node:8.1.0

ADD . .

RUN yarn install

ENV NODE_MODULES_CACHE false
ENV PORT 80

EXPOSE 80

CMD ["yarn", "start"]

HEALTHCHECK CMD curl --fail http://localhost/ || exit 1
