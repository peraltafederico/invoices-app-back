#! /bin/bash

cd /home/ec2-user/app/
docker pull peraltafederico/invoices-app:latest
docker-compose up -d