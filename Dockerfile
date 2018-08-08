# base image
FROM node:8.9.4

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

COPY . /usr/src/app
RUN ng build --base-href ui

# Build the file server
FROM golang:1.9
RUN go get github.com/wlan0/serve
RUN GOOS=linux GARCH=amd64 go install -v -a -tags netgo -installsuffix netgo -ldflags "-linkmode external -extldflags -static" github.com/wlan0/serve


# add app
FROM alpine:latest
RUN apk --no-cache add ca-certificates
RUN mkdir -p /usr/src/app/dist
RUN mkdir -p /usr/src/app/scripts
COPY --from=0 /usr/src/app/dist /usr/src/app/dist
COPY --from=0 /usr/src/app/scripts/serve-http /usr/src/app/scripts/serve-http
COPY --from=1 /go/bin/serve /bin/serve
ENV NO_BUILD true

# start app
CMD /usr/src/app/scripts/serve-http $@
