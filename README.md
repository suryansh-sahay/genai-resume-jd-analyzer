# GenAI Resume-JD Analyzer

A full-stack application that helps candidates analyze their resumes against job descriptions and generate personalized interview preparation reports using AI.

> **Status:** Active development

[![CI](https://github.com/suryansh-sahay/GenAI_Resume-JD-Analyzer/actions/workflows/ci.yml/badge.svg)](https://github.com/suryansh-sahay/GenAI_Resume-JD-Analyzer/actions/workflows/ci.yml)

---

## Table of Contents

* [Overview](#overview)
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
* Use candidate self-description as additional context.
* Generate an AI-powered interview report using Gemini 3.6 Flash.
* Provide a match score between the candidate and the target role.
* Generate technical and behavioral interview questions with answer guidance.
* Identify skill gaps and their severity.
* Provide a day-wise interview preparation roadmap.
* Store and manage generated interview reports.
* Generate downloadable resumes as PDF files.

The project is developed using a feature-branch and pull-request workflow with automated CI checks.

---

## Architecture

The application follows a client-server architecture with an AI processing layer:

```text
┌──────────────────────────┐
│        Frontend          │
│      React + Vite        │
│                          │
│ Authentication           │
│ Protected Routes         │
│ Interview Report UI      │
│ Resume Upload            │
└────────────┬─────────────┘
             │
             │ HTTP API
             ▼
┌──────────────────────────┐
│         Backend          │
│     Node.js + Express    │
│                          │
│ Controllers              │
│ Middleware               │
│ REST APIs                │
│ PDF Processing           │
│ AI Services              │
└─────────┬─────────┬──────┘
          │         │
          │         │
          ▼         ▼
┌────────────────┐ ┌────────────────────┐
│    MongoDB     │ │  Gemini 3.6 Flash  │
│                │ │                    │
│ Users          │ │ Interview Report   │
│ Interview      │ │ Generation         │
│ Reports        │ │                    │
└────────────────┘ └────────────────────┘
```

---

## Tech Stack

| Layer           | Technologies                                      |
| --------------- | ------------------------------------------------- |
| Frontend        | React, Vite, React Router, SCSS, Axios            |
| Backend         | Node.js, Express.js                               |
| Database        | MongoDB, Mongoose                                 |
| AI              | Google Gemini 3.6 Flash                          |
| Validation      | Zod, zod-to-json-schema                            |
| Authentication  | JWT, bcryptjs, HTTP cookies                       |
| PDF Processing  | pdf-parse, Puppeteer                              |
| Code Quality    | ESLint                                            |
| Version Control | Git, GitHub                                       |
| CI              | GitHub Actions                                    |

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
│   │   ├── routes/
│   │   └── services/
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   └── interview/
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
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Never commit real credentials or API keys to the repository.

---

## Development Workflow

The project follows a feature-branch and pull-request workflow.

```text
main
  │
  └── feature/<feature-name>
          │
          ├── Development
          ├── Local Validation
          └── Commits
                │
                ▼
          Pull Request
                │
                ▼
          GitHub Actions
                │
                ▼
          Code Review
                │
                ▼
          Squash & Merge
                │
                ▼
               main
```

Feature development is isolated in dedicated branches before being reviewed and merged into `main`.

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
* [x] Resume PDF upload
* [x] Resume text extraction
* [x] Job description input
* [x] Candidate self-description
* [x] AI-powered interview report generation
* [x] Match scoring
* [x] Technical interview questions
* [x] Behavioral interview questions
* [x] Skill-gap analysis
* [x] Interview preparation roadmap
* [x] Interview report persistence
* [x] Interview report frontend
* [x] Resume PDF generation

### Infrastructure

* [ ] Automated backend tests
* [ ] Backend linting
* [ ] Production frontend deployment
* [ ] Backend containerization
* [ ] Backend deployment on Google Cloud Run
* [ ] Production environment configuration
* [ ] Continuous deployment
* [ ] Automated production deployment pipeline

---

## Project Status

The project is currently under active development.

The application currently provides:

* Full-stack React and Express architecture
* MongoDB persistence
* User authentication and protected routes
* Resume PDF upload and processing
* Resume and job description analysis
* Gemini 3.6 Flash powered interview report generation
* Structured AI response validation using Zod
* Match scoring
* Technical and behavioral interview questions
* Skill-gap analysis
* Day-wise interview preparation roadmap
* Interview report persistence and viewing
* Resume PDF generation
* Pull-request based development
* Automated CI checks

The next development phase focuses on automated testing, production deployment, and additional infrastructure improvements.

---

## Repository

GitHub:

https://github.com/suryansh-sahay/GenAI_Resume-JD-Analyzer
