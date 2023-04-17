# post-service
Express app for publish posts in blog with authentication and authorization by jwt token with load balancing with Nginx, Mongodb for persistence data
If you want run locally:
```sh
npm install
```
then
```sh
npm run dev
```
or
```sh
npm run start
```
App started on 3000 port
Or you can run it with docker-compose
```sh
docker-compose up -d --scale app=4
```