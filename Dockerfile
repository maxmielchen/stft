FROM node:20.11.0 as builder

WORKDIR /app

COPY . .
RUN npm install

RUN npm run-script build

FROM nginx:1.25.3

COPY --from=builder /app/dist /usr/share/nginx/html
