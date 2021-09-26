#! /bin/bash

cd /home/ec2-user/app/
docker pull peraltafederico/invoices-app-back:latest
docker-compose up -d