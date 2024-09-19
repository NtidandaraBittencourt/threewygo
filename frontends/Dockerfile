FROM node:18-slim AS build

WORKDIR /app

COPY package.json ./ 
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4200

CMD ["npm", "run", "dev"]
