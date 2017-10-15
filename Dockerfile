FROM debian:stretch
ARG NODE_MAJOR_VERSION=8

RUN apt-get update && apt-get install -y git ssh-client curl adduser build-essential && \
	adduser 1000 --force-badname && \
	curl -sL https://deb.nodesource.com/setup_${NODE_MAJOR_VERSION}.x | bash && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
	apt-get install -y nodejs && \
	apt-get purge -y curl yarn && \
    apt-get autoremove -y && \
    apt-get update && apt-get install yarn -y && \
	apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /src

COPY . .

RUN chown -R 1000 /src

USER 1000

CMD eval $(ssh-agent -s) && ssh-add ~/.ssh/id_rsa && yarn install && npm start

EXPOSE 3000