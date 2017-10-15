# Hubgine

## Introduction

Hubgine isomorphic web application.

## Configuration

- **Platform:** node
- **Framework**: express
- **Template Engine**: jade
- **CSS Framework**: bootstrap
- **CSS Preprocessor**: sass
- **JavaScript Framework**: react
- **Build Tool**: npm

## Docker
```
docker build -t hubgine-web-app .
```

```
docker run -d -p 3000:3000 -v ~/.ssh/id_rsa:/home/1000/.ssh hubgine-web-app
```

## Installation

**Clone repository**
```
git clone https://spoutnik87@bitbucket.org/TWEET-BOT/bot_twitter_web.git
```
or
```
git clone git@bitbucket.org:TWEET-BOT/bot_twitter_web.git
```

**Navigate to project folder**
```
cd bot_twitter_web
```

**Install dependencies**
```
npm install
```

**Build project**
```
npm run buildproduction
```

**Start project**
```
npm run start:production
```