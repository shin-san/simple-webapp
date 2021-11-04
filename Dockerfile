FROM node:14-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .

# To Fix Permissions for Packages
RUN npm config set unsafe-perm true

RUN npm install
# Copy app files
COPY . .

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
RUN chown -R node:node ./node_modules

USER node

# Start the app
CMD [ "npm", "start" ]
