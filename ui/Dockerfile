FROM node:8.11-jessie
MAINTAINER Zachary Zwiesler <zackzwiesler@gmail.com>

# add the npm dependencies and install
COPY ["package.json", "yarn.lock", "/app/"]
WORKDIR /app
RUN yarn install

# add files to context
COPY src /app/src
COPY public /app/public
