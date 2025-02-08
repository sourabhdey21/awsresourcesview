# AWS Resource Viewer

A modern web application for viewing and monitoring AWS resources using a secure and user-friendly interface. Built with React, FastAPI, and PostgreSQL.

![AWS Resource Viewer](https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg)

## Installation on Ubuntu

1. Install Docker:
```bash
sudo apt-get update
sudo apt-get install docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

2. Install Docker Compose:
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```



## Run the application

```bash
docker-compose up --build
```

## Access the application

```bash
http://localhost:80

```





