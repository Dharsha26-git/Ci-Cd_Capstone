#!/bin/bash

echo "Shell script for ddeploying automatically"

echo "Pulling Docker images..."
docker compose pull

echo "Stopping existing containers..."
docker compose down

echo "Starting containers"
docker compose up -d

echo "Deployment completed successfully!"
