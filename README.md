                                      CI/CD Capstone Project – Docker & AWS EC2
                                      
        ----------------------------------------------------------------------------------------------------------------

1. Project Overview:
  This project demonstrates a complete CI/CD pipeline for a simple web application using Docker, GitHub Actions, and AWS EC2.
  The application consists of a frontend, backend, and PostgreSQL database, all containerized and automatically deployed to an EC2 instance.

  Whenever code is pushed to GitHub:

    -> Docker images are built and pushed to Docker Hub (CI)

    -> The latest images are automatically deployed to EC2 (CD)


    --------------------------------------------------------------------------------------
