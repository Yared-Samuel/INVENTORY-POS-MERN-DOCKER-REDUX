FROM node:21.1.0

WORKDIR /frontend

COPY package.json .

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]