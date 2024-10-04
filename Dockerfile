# Utilise une image Node.js avec une version stable
FROM node:18-alpine

RUN apk add --no-cache bash
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

# RUN npm run build

EXPOSE 3000

CMD ["npm", "run","dev"]
