FROM node:latest as builder

WORKDIR /widgets
COPY . .
RUN yarn && yarn build

FROM arm64v8/nginx:latest

COPY --from=builder  /widgets/dist/* /usr/share/nginx/html/
