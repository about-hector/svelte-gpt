#This Dockerfile first build the app in node, then makes it run in Deno!
# docker build -t sveltekit-dockerized
# docker run -p 3000:3000 --name sveltekit-app-sample sveltekit-dockerized

#######################################
# Build stage
#######################################
FROM node:lts-alpine as builder

WORKDIR /app

# install npm dependencies (cache second)
COPY package*.json ./

RUN npm install
# copy remaining files
COPY . .

# build app
RUN npm run build

#######################################
# Serve stage
#######################################
FROM denoland/deno:alpine-1.33.3 as runner

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
#RUN deno cache --unstable --import-map=import_map.json --lock=lock.json -lock-write ./output/server/index.js
#COPY --from=builder /app/.svelte-kit ./.svelte-kit
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
EXPOSE 3000

#CMD ["deno", "run", "--allow-net", "--unstable", "./output/server/index.js"]
CMD ["deno", "run", "--allow-env", "--allow-read", "--allow-net", "./build/index.js"]

