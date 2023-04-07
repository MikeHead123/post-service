FROM node:16.14.0-alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY . .
RUN npm install
#Expose port and start application
EXPOSE 3000
CMD [ "npm", "start" ]