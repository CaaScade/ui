# base image
FROM node:9.6.1

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
RUN mkdir -p /usr/src/app/dist
RUN mkdir -p /usr/src/app/scripts
WORKDIR /usr/src/app

# install and cache app dependencies
RUN npm install -g @angular/cli@6.0.8
RUN npm install -g http-server

# add app
COPY ./dist /usr/src/app/dist
COPY ./scripts/ /usr/src/app/scripts/
ENV NOBUILD true

# start app
CMD /usr/src/app/scripts/serve-http $@
