FROM debian:stretch
ARG NODE_MAJOR_VERSION=8

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y git ssh-client curl build-essential adduser

RUN adduser 1000 --force-badname

RUN curl -sL https://deb.nodesource.com/setup_${NODE_MAJOR_VERSION}.x | bash -

RUN apt-get install -y nodejs

#RUN apt-get purge -y curl adduser

#RUN apt-get install -y ssh-client

RUN mkdir -p /usr/app

RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY ${SSH_KEY_PATH} /home/1000/.ssh

RUN cat /home/1000/.ssh/id_rsa

WORKDIR /usr/app

USER 1000

COPY package.json /usr/app

RUN npm install

COPY . /usr/app

EXPOSE 3000

CMD [ "npm", "run", "buildproduction" ]
CMD [ "npm", "start" ]

#docker build -t hubgine-web-app . --build-arg SSH_KEY_PATH=C:\Users\Spoutnik87\.ssh\id_rsa
#docker build -t hubgine-web-app . --build-arg SSH_KEY_PATH=//c/Users/Spoutnik87/.ssh/id_rsa