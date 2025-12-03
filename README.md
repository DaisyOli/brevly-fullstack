Brev.ly — Full-Stack URL Shortener

A complete full-stack project built during Rocketseat’s Pós-360 program.
This repository contains both the Backend API (Fastify + Node.js + PostgreSQL) and the Frontend SPA (React + Vite + TypeScript) for a production-ready URL shortener with CSV export via Cloudflare R2.

🚀 Overview

Brev.ly is a full-stack application that allows users to:

Create shortened URLs (with optional custom shortCode)

Store, list and delete links

Redirect visitors to the original URL

Track click counts

Export link reports as CSV

Upload CSVs to a CDN via Cloudflare R2

Download CSVs publicly from the CDN

Use a fully responsive frontend SPA aligned with the provided Figma design

This project implements all required functionalities from the Rocketseat Pós-360 Final Challenge — Phase 1.

🏗️ Project Structure
brevly-fullstack/
  ├── server/   → Backend API (Fastify, TypeScript, Drizzle ORM, PostgreSQL)
  └── web/      → Frontend SPA (React, TypeScript, Vite, Tailwind)

📦 Technologies Used
Backend

Node.js

Fastify

TypeScript

Drizzle ORM

PostgreSQL

Zod

Cloudflare R2 (CSV export CDN)

Swagger (OpenAPI documentation)

pnpm

Dockerfile (multi-stage)

Frontend

React

TypeScript

Vite

React Router

TailwindCSS

React Hook Form

Zod

📁 Features (Challenge Requirements)
Backend

 Create a shortened link

 Validate shortCode format

 Prevent duplicate shortCodes

 Delete link

 List all links

 Redirect using /:shortCode

 Count clicks

 Export links to CSV

 Upload CSV to Cloudflare R2

 Generate unique random file names

 Provide public CDN URL for download

 .env.example with all environment variables

 PostgreSQL + Drizzle ORM

 db:migrate script

 Dockerfile following good practices

Frontend

 React SPA using Vite

 Follow Figma layout

 Create new link

 Delete link

 List links

 Redirect on /:shortCode

 Handle loading states, UX improvements

 Responsive design (mobile first)

 Export CSV using Cloudflare R2 download URL

 .env.example with VITE_BACKEND_URL and VITE_FRONTEND_URL

🧭 How to Run the Project Locally
🔧 1. Clone the repository
git clone https://github.com/DaisyOli/brevly-fullstack
cd brevly-fullstack

🗄️ Backend Setup
cd server
pnpm install

1. Create .env

Use .env.example as reference:

PORT=3333
DATABASE_URL=postgres://...
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_ACCESS_KEY_ID=
CLOUDFLARE_SECRET_ACCESS_KEY=
CLOUDFLARE_BUCKET=
CLOUDFLARE_PUBLIC_URL=

2. Run migrations
pnpm db:migrate

3. Start the server
pnpm dev


The API will run at:

http://localhost:3333


OpenAPI docs available at:

http://localhost:3333/docs

💻 Frontend Setup
cd web
pnpm install

Create .env
VITE_BACKEND_URL=http://localhost:3333
VITE_FRONTEND_URL=http://localhost:5173

Run the SPA
pnpm dev


App available at:

http://localhost:5173

🔗 API Endpoints (Summary)
Method	Route	Description
POST	/links	Creates a shortened link
GET	/links	Lists all links
DELETE	/links/:shortCode	Deletes a link
GET	/:shortCode	Redirects to the original URL & increments clicks
POST	/links/export	Generates CSV + uploads to R2 + returns public URL

Full documentation: /docs (Swagger)

🌐 Cloudflare R2 Integration

The backend uses Cloudflare R2 for:

CSV storage

Public file access

Serving files through a CDN domain (*.r2.dev or a custom domain)

Uploads use the S3-compatible API via @aws-sdk/client-s3.

📸 Screenshots (optional placeholders)
/docs/screenshots/home.png
/docs/screenshots/list.png
/docs/screenshots/export.png

🐳 Docker (Backend)

Build:

cd server
docker build -t brevly-api .


Run:

docker run -p 3333:3333 --env-file .env brevly-api

🎯 Final Notes

This project was developed as part of the Rocketseat Pós-360 program.
It demonstrates:

full-stack development

API design

database modeling

cloud object storage

frontend integration

good architecture & organization

Feel free to fork, study, or extend the application!
