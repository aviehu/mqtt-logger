#!/bin/sh

COMMIT=`git rev-parse --short HEAD`
TAG="rc-$COMMIT"

docker build -t 788139694487.dkr.ecr.eu-west-1.amazonaws.com/mqtt-logger:$TAG .
docker push 788139694487.dkr.ecr.eu-west-1.amazonaws.com/mqtt-logger:$TAG
