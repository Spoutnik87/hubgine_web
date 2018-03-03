FROM alpine:latest

ENV NODE_ENV=production

RUN apk update && \
	apk add nodejs openssh git python && \
	adduser 1000 -D

WORKDIR /src

ADD . .

RUN mv /src/client-config-prod.json /src/client-config.json && \
	mv /src/server-config-prod.json /src/server-config.json

RUN chown -R 1000 /src

USER 1000

RUN mkdir ~/.ssh

CMD ssh-keyscan -t rsa bitbucket.org >> ~/.ssh/known_hosts && eval $(ssh-agent -s) && ssh-add /run/secrets/access_key && npm install --production && npm start

EXPOSE 3000

#FROM debian:stretch
#ARG NODE_MAJOR_VERSION=9
#ENV NODE_ENV=production

#RUN apt-get update && apt-get install -y git ssh-client curl adduser build-essential && \
#	adduser 1000 --force-badname && \
#	curl -sL https://deb.nodesource.com/setup_${NODE_MAJOR_VERSION}.x | bash && \
#    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
#    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
#	apt-get install -y nodejs && \
#	apt-get purge -y curl yarn && \
#    apt-get autoremove -y && \
#    apt-get update && apt-get install yarn -y && \
#	apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#WORKDIR /src

#ADD . .

#RUN mv /src/client-config-prod.json /src/client-config.json && \
#	mv /src/server-config-prod.json /src/server-config.json

#RUN chown -R 1000 /src

#USER 1000

#RUN mkdir ~/.ssh

#CMD ssh-keyscan -t rsa bitbucket.org >> ~/.ssh/known_hosts && eval $(ssh-agent -s) && ssh-add /run/secrets/access_key && yarn install --production && yarn start

#EXPOSE 3000