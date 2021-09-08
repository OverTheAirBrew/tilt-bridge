FROM node:16 as build

COPY . .

RUN npm ci
RUN npm run build
RUN npm prune --production

FROM node:16-slim

WORKDIR /usr/src/tilt-bridge

COPY --from=build ./dist ./dist
COPY --from=build ./node_modules ./node_modules
COPY --from=build ./package.json ./package.json

ENTRYPOINT ["node"]
CMD ["./dist/docker/index.js"]