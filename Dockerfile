FROM node:20.0-alpine

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port and start application
EXPOSE 3000
CMD ["npm", "run", "start"]

