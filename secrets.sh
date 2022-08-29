#!/bin/bash
mkdir -p ./secrets
ssh-keygen -t rsa -P "" -b 4096 -m PEM -f ./secrets/private.key
ssh-keygen -e -m PEM -f ./secrets/private.key > ./secrets/public.pem