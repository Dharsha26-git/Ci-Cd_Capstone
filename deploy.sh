#!/bin/bash

echo "Pulling latest images..."
docker compose pull

echo "Stopping old containers..."
docker compose down

echo "Starting new containers..."
docker compose up -d

echo "Deployment completed"
