FROM node:21.1.0

RUN npm install -g nodemon

WORKDIR /backend

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start"]