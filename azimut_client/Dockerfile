FROM node:18

WORKDIR /app

COPY package*.json ./
# install dependencies 
RUN npm install


#copy project
COPY . .

EXPOSE 3000
CMD ["npm", "start"]