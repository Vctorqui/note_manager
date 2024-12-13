FROM node:18

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3001

CMD ["yarn", "start"]