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

RUN chown -R node /app/node_modules
# Expose port
EXPOSE 3000
USER node
# Start the app
CMD [ "npm", "start" ]
