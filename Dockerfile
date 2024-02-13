FROM node:20.11.0 as builder

COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.25.3

COPY --from=builder /dist /usr/share/nginx/html
