                                      CI-CD_Capstone Project – Docker & AWS EC2

----------------------------------------------                                             
1. Project Overview:
   
  This project demonstrates a complete CI/CD pipeline for a simple web application using Docker, GitHub Actions, and AWS EC2.
  The application consists of a frontend, backend, and PostgreSQL database, all containerized and automatically deployed to an EC2 instance.

    Whenever code is pushed to GitHub:

      -> Docker images are built and pushed to Docker Hub (CI)

      -> The latest images are automatically deployed to EC2 (CD)

-----------------------------------------
      
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

---------------------------------------------------------

3. Technology Stack:

        . Frontend: HTML, JavaScript
  
        . Backend: Python, Flask
  
        . Database: PostgreSQL
  
        . Containerization: Docker, Docker Compose
  
        . CI/CD: GitHub Actions
  
        . Container Registry: Docker Hub
  
        . Deployment: AWS EC2 (Ubuntu)

---------------------------------------------------

4. API Endpoints:

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| GET    | `/health`      | Health check           |
| GET    | `/data`        | Fetch all records      |
| POST   | `/add`         | Add new record         |
| PUT    | `/update/<id>` | Update existing record |
| DELETE | `/delete/<id>` | Delete record          |
 
-------------------------------------------------------

5. Docker Images:

    The following Docker images are built and pushed automatically:

        . dharsha12/flask-backend:latest

        . dharsha12/flask-frontend:latest

------------------------------------------------------

6. Docker compose setup:

   The application is orchestrated using Docker Compose with three services:

       . frontend

       . backend

       . postgres

-------------------------------------------

7. Continous Integration (CI):

    CI Workflow Responsibilities:

        Triggered on push to the main branch

        Builds Docker images for frontend and backend

        Pushes images to Docker Hub

    CI Tool:

        GitHub Actions
---------------------------------------

8. Continous Deployment (CD):

    Deployment Strategy:

       . GitHub Actions connects to AWS EC2 via SSH

       . Executes a deployment script on the EC2 instance

       . Pulls latest Docker images

       . Restarts containers using Docker Compose

   Deployment Scripts (deploy.sh):

       . docker compose pull
       . docker compose up -d
   
   Important Note:
   
      The EC2 instance must be running for deployment to work.
   
      If EC2 is stopped, the application will not be accessible.

-----------------------------------------------------

9. AWS EC2 Configuration:

    OS: Ubuntu

    Ports opened in Security Group:

        . 8080 (Frontend)

        . 5000 (Backend)

        .  22 (SSH)

    Docker and Docker Compose v2 are installed on the EC2 instance.

------------------------------------------------------

10. How to Access the Application:

    Frontend:
    
      -> http://13.60.98.204:8080

    Backend API:
      -> http://13.60.98.204:5000/data

---------------------

11. Deployment Flow Summary:

      . Developer pushes code to GitHub

      . CI workflow builds and pushes Docker images to Docker Hub

      . CD workflow logs into EC2 via SSH

      . EC2 pulls latest images and restarts containers

      . Updated application becomes live automatically

  No manual commands are required on EC2 after CD is set up.
