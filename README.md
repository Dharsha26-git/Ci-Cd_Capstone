                                      CI-CD_Capstone Project – Docker & AWS EC2
                                      
        
1. Project Overview:
   
  This project demonstrates a complete CI/CD pipeline for a simple web application using Docker, GitHub Actions, and AWS EC2.
  The application consists of a frontend, backend, and PostgreSQL database, all containerized and automatically deployed to an EC2 instance.

    Whenever code is pushed to GitHub:

      -> Docker images are built and pushed to Docker Hub (CI)

      -> The latest images are automatically deployed to EC2 (CD)

2. Application Architecture:

  -> Frontend:
  
      . Static HTML and JavaScript

      . Displays data in table format

      . Allows users to add, update, and delete records

      . Runs inside an Nginx container

      . Exposed on port 8080
      
   -> Backend:

       . Flask REST API

       . Handles CRUD operations

       . Connects to PostgreSQL database

       . Runs inside a Python container

       . Exposed on port 5000

   -> Database:

        . PostgreSQL

        . Use Docker named volume for Data persistence

3. Technology Stack:

      . Frontend: HTML, JavaScript
  
      . Backend: Python, Flask
  
      . Database: PostgreSQL
  
      . Containerization: Docker, Docker Compose
  
      . CI/CD: GitHub Actions
  
      . Container Registry: Docker Hub
  
      . Deployment: AWS EC2 (Ubuntu)
