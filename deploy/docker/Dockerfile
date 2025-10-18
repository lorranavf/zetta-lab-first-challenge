FROM node:24-alpine

WORKDIR /app

COPY src/app/package.json ./

RUN npm install --include=dev --no-audit --no-fund

ENV HOST=0.0.0.0

EXPOSE 8000

CMD ["npm", "run", "dev"]