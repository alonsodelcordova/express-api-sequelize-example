FROM node:20

# Create app directory
WORKDIR /app
COPY package.json .

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port and start application
EXPOSE 3000
CMD ["npm", "run", "start"]

