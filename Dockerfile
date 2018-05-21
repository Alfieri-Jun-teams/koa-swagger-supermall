#Dockerfile
FROM docker.io/node

#Create app dir
RUN mkdir -p /home/swagger
WORKDIR /home/swagger

#Bundle app source
COPY . /home/swagger

RUN npm install

EXPOSE 5566

CMD [ "npm", "start" ]