FROM node:20.10-alpine

# Create app directory
WORKDIR /app
COPY . .

# Install app dependencies
RUN npm install


# Expose port and start application
EXPOSE 3000
CMD ["npm", "run", "start"]

