FROM node:16-slim

WORKDIR /usr/src/tilt-bridge

COPY ./dist ./dist
COPY ./node_modules ./node_modules
COPY ./package.json ./package.json

ENTRYPOINT ["node"]
CMD ["./dist/docker/index.js"]