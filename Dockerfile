FROM node:16 as build

WORKDIR /usr/build
COPY . .

RUN npm ci --unsafe-perm
RUN npm run build
RUN npm prune --production

FROM node:16-slim

WORKDIR /usr/src/tilt-bridge

COPY --from=build /usr/build/dist ./dist
COPY --from=build /usr/build/node_modules ./node_modules
COPY --from=build /usr/build/package.json ./package.json

ENTRYPOINT ["node"]
CMD ["./dist/docker/index.js"]