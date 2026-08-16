# GenAI Resume-JD Analyzer

A full-stack application that helps candidates analyze their resumes against job descriptions and identify relevant skills, gaps and improvements using AI.

> **Status:** Active development

[![CI](https://github.com/suryansh-sahay/GenAI_Resume-JD-Analyzer/actions/workflows/ci.yml/badge.svg)](https://github.com/suryansh-sahay/GenAI_Resume-JD-Analyzer/actions/workflows/ci.yml)

---

## Table of Contents

* [Overview](#overview)
* [Current Features](#current-features)
* [Architecture](#architecture)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Development Workflow](#development-workflow)
* [CI Pipeline](#ci-pipeline)
* [Roadmap](#roadmap)
* [Project Status](#project-status)

---

## Overview

The application is designed to:

* Analyze a candidate's resume against a specific job description.
* Identify matching and missing skills.
* Highlight gaps between the candidate profile and job requirements.
* Provide actionable recommendations for improving job alignment.
* Provide an authenticated workspace for managing the application experience.

The project is being developed using a feature-branch and pull-request workflow with automated CI checks.

---

## Architecture

The application follows a client-server architecture:

```text
┌─────────────────────┐
│      Frontend       │
│   React + Vite      │
│                     │
│ Authentication UI   │
│ Protected Routes    │
└──────────┬──────────┘
           │
           │ HTTP API
           ▼
┌─────────────────────┐
│       Backend       │
│ Node.js + Express   │
│                     │
│ Auth Controllers    │
│ Middleware          │
│ REST API             │
└──────────┬──────────┘
           │
           │ Mongoose
           ▼
┌─────────────────────┐
│      MongoDB        │
│    Application DB   │
└─────────────────────┘
```

---

## Tech Stack

| Layer           | Technologies                           |
| --------------- | -------------------------------------- |
| Frontend        | React, Vite, React Router, SCSS, Axios |
| Backend         | Node.js, Express.js                    |
| Database        | MongoDB, Mongoose                      |
| Authentication  | JWT, bcryptjs, HTTP cookies            |
| Code Quality    | ESLint                                 |
| Version Control | Git, GitHub                            |
| CI              | GitHub Actions                         |

---

## Project Structure

```text
GenAI_Resume-JD-Analyzer/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── features/
│   │   │   └── auth/
│   │   ├── style/
│   │   ├── App.jsx
│   │   ├── app.routes.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js 20+
* Git
* MongoDB or MongoDB Atlas

### Clone the repository

```bash
git clone https://github.com/suryansh-sahay/GenAI_Resume-JD-Analyzer.git
cd GenAI_Resume-JD-Analyzer
```

### Backend Setup

Navigate to the backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm ci
```

Create a `.env` file inside `Backend/` and configure the required environment variables.

Start the development server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

### Frontend Setup

Open a new terminal and navigate to:

```text
GenAI_Resume-JD-Analyzer/Frontend
```

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

### Frontend Validation

Run ESLint:

```bash
npm run lint
```

Build the application:

```bash
npm run build
```

---

## Environment Variables

The application uses environment variables for configuration and secrets.

### Backend

Create:

```text
Backend/.env
```

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## CI Pipeline

GitHub Actions runs automatically for pull requests targeting `main`.

The current CI pipeline validates both applications.

### Frontend

* Install dependencies using `npm ci`
* Run ESLint
* Create a production build using Vite

### Backend

* Install dependencies using `npm ci`

Current workflow:

```text
Pull Request
     │
     ▼
GitHub Actions
     │
     ├── Frontend
     │    ├── npm ci
     │    ├── npm run lint
     │    └── npm run build
     │
     └── Backend
          └── npm ci
     │
     ▼
   Checks Pass
     │
     ▼
Pull Request Review
     │
     ▼
Squash & Merge
     │
     ▼
main
```

The CI pipeline will be extended with backend linting, automated tests, and deployment checks as the application grows.

---

## Roadmap

### Core Application

* [x] User registration and login
* [x] JWT authentication
* [x] Protected routes
* [x] Authentication persistence
* [x] GitHub Actions CI
* [ ] Resume upload
* [ ] Resume parsing
* [ ] Job description input and parsing
* [ ] Resume-to-JD analysis
* [ ] Skill matching and gap detection
* [ ] AI-generated recommendations
* [ ] Match scoring
* [ ] User dashboard

### Infrastructure

* [ ] Production frontend deployment
* [ ] Backend containerization
* [ ] Backend deployment on Google Cloud Run
* [ ] Production environment configuration
* [ ] Continuous deployment
* [ ] Automated production deployment pipeline

---

## Project Status

The project is currently under active development.

The application currently provides the foundation required for the core product, including:

* Full-stack React and Express architecture
* MongoDB persistence
* User authentication
* JWT-based authorization
* Protected application routes
* Authentication state management
* Pull-request based development
* Automated CI checks

The next development phase focuses on implementing the core resume and job-description analysis functionality.

---

## Repository

GitHub:

https://github.com/suryansh-sahay/genai-resume-jd-analyzer
