FROM node:16.14.0-alpine
# Create app directory
WORKDIR /usr/src/app
COPY . .
# Install app dependencies
RUN npm install --only=production
RUN npm run build
#Expose port and start application
EXPOSE 3000
CMD [ "npm", "start" ]