FROM node:19.2-alpine3.16
WORKDIR /app
COPY package*.json ./
RUN rm -rf yarn.lock && npm install
COPY . .
EXPOSE 8085
CMD ["npm", "run", "start"]