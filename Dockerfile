FROM node:10.15.3-slim

WORKDIR /checkmate

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]