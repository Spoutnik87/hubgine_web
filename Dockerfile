FROM debian:stretch
ARG NODE_MAJOR_VERSION=8
ARG SSH_KEY

RUN apt-get update && apt-get install -y git ssh-client curl adduser build-essential && \
	adduser 1000 --force-badname && \
	curl -sL https://deb.nodesource.com/setup_${NODE_MAJOR_VERSION}.x | bash && \
	apt-get install -y nodejs && \
	#apt-get purge -y curl adduser && \
	apt-get install -y ssh-client && \
	apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#WORKDIR /src

#RUN mkdir /home/1000/.ssh && echo ${SSH_KEY} | sed '/^$/d' > /home/1000/.ssh/id_rsa && chmod 644 /home/1000/.ssh/id_rsa && chown root /home/1000/.ssh/id_rsa

#RUN eval $(ssh-agent -s) && ssh-add ~/.ssh/id_rsa

#RUN echo ${SSH_KEY}

#RUN mkdir ~/.ssh && echo ${SSH_KEY} > ~/.ssh/id_rsa && eval $(ssh-agent -s) > /dev/null && chmod 644 ~/.ssh/id_rsa && chown root ~/.ssh/id_rsa  && ssh-add ~/.ssh/id_rsa
#RUN mkdir ~/.ssh && echo ${SSH_KEY} > ~/.ssh/id_rsa && eval $(ssh-agent -s) > /dev/null && echo ${SSH_KEY}  ssh-add -

#RUN echo ${SSH_KEY} > /src/id_rsa

WORKDIR /src

COPY . .

RUN chown -R 1000 /src

USER 1000

#RUN npm install

#EXPOSE 3000

CMD eval $(ssh-agent -s) && ssh-add ~/.ssh/id_rsa && npm install && npm start

EXPOSE 3000

#USER 1000

#CMD npm run buildproduction && npm start

#CMD [ "npm", "run", "buildproduction" ]

#CMD [ "npm", "start" ]

#docker build -t hubgine-web-app . --build-arg SSH_KEY_PATH=C:\Users\Spoutnik87\.ssh\id_rsa
#docker build -t hubgine-web-app . --build-arg SSH_KEY_PATH=//c/Users/Spoutnik87/.ssh/id_rsa

#docker build --build-arg SSH_KEY=$(/home/spout/.ssh/id_rsa) -t hubgine-web-app .
#docker run -p 3000:3000 -it --rm -v $HOME/.ssh:/home/spout/.ssh hubgine-web-app
