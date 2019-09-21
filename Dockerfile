FROM node:10.15.3

WORKDIR /checkmate

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]