# SIT323-2025-Prac5D: Dockerized Node.js Microservice Deployed to Cloud Run

This repository contains a Dockerized Node.js microservice deployed to Google Cloud's Cloud Run, secured via authenticated requests using Google Identity Tokens.

## Overview

This project extends a Dockerized microservice to use Google Cloud Platform's (GCP) Artifact Registry and Cloud Run services.

---

## Step-by-Step Deployment Guide

### Prerequisites

- Google Cloud account
- Docker installed
- Google Cloud SDK (gcloud) installed and configured
- Node.js installed

### Step 1: Clone Repository

```bash
git clone https://github.com/musajee2/sit323-2025-prac5d.git
cd sit323-2025-prac5d
```

### Step 2: Dockerize the Node.js Application

Create a Dockerfile (if not already present):

```Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]
```

### Step 3: Build Docker Image

```bash
docker build -t australia-southeast1-docker.pkg.dev/<your-project-id>/my-repo/my-app:latest .
```

Replace `<your-project-id>` with your actual Google Cloud project ID.

### Step 4: Configure Google Cloud Artifact Registry

Create a private repository:

```bash
gcloud artifacts repositories create my-repo \
  --repository-format=docker \
  --location=australia-southeast1 \
  --description="Docker repository"
```

Authenticate Docker with Artifact Registry:

```bash
gcloud auth configure-docker australia-southeast1-docker.pkg.dev
```

### Step 5: Push Docker Image to Artifact Registry

```bash
docker push australia-southeast1-docker.pkg.dev/<your-project-id>/my-repo/my-app:latest
```

### Step 6: Deploy to Cloud Run

```bash
gcloud run deploy my-app \
  --image=australia-southeast1-docker.pkg.dev/<your-project-id>/my-repo/my-app:latest \
  --platform=managed \
  --region=australia-southeast1 \
  --allow-unauthenticated=false
```

### Step 7: Accessing the Service Securely

Since your service requires authentication, obtain an identity token:

```bash
TOKEN=$(gcloud auth print-identity-token)
```

Use this token to access your service securely:

```bash
curl -H "Authorization: Bearer $TOKEN" <your-cloud-run-service-url>
```

Replace `<your-cloud-run-service-url>` with your Cloud Run service URL.


## License

This project is open-source under the MIT License.

---

**Author:** Muhammad Musa
