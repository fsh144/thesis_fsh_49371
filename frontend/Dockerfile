# Stage 1: Build the React application
FROM node:16 as build

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Optional: Verify the build output
RUN ls /frontend/build

# Stage 2: Serve the React application from Nginx
FROM nginx:alpine

COPY --from=build /frontend/build /usr/share/nginx/html

EXPOSE 80
