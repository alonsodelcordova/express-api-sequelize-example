FROM node:20.0-alpine

# Create app directory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
COPY package*.json ./
USER node
# Install app dependencies
RUN npm install

# Bundle app source
COPY --chown=node:node . .

# Expose port and start application
EXPOSE 3000
CMD ["npm", "run", "start"]

