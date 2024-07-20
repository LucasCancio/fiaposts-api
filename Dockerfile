FROM node:22

# Setting up the workdir
WORKDIR /usr/app

# COPY package.json
COPY package.json ./

# Installing dependencies
RUN npm install

# Copying all the files in our project
COPY . .

# Setting up envs
ARG DATABASE_URL
ARG JWT_SECRET

ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET

# Instaling pnpm
RUN npm i -g pnpm

# Building the project
RUN pnpm build

# Exposing server port
EXPOSE 3010

# Starting the server
CMD ["npm", "start"]