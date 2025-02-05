FROM node:22-alpine

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

# Install app dependencies
RUN npm install --force

# Bundle app source
COPY . /usr/src/app

# Expose port and start application
EXPOSE 3000
CMD ["npm", "run", "start"]

