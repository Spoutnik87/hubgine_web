FROM alpine:latest

ENV NODE_ENV=production

RUN apk update && \
	apk add nodejs openssh git python make g++ && \
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