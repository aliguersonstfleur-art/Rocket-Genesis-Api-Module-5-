# Project-Wide AI Specification

**This is the project-wide specification. Read it before any feature specification.**

- The rules in this document apply to **every feature** of the project, unless a feature specification explicitly states an exception.
- Feature specifications (`*.feature.md`) describe requirements that are **unique to a single feature**. They must not repeat what is already defined here.
- Any implementation must satisfy **both** this document and the relevant feature specification.
- If the two documents conflict, resolve the conflict explicitly instead of guessing: update the feature specification, or this one.

---

## 1. Project Identity

- **Project Name:** Rocket Genesis API (Rocket Elevators backend)
- **Short Description:** A REST API for Rocket Elevators that manages agents and regions. Refactored from a Module 4 Express app using hardcoded data into a Module 5 MongoDB-backed, MVC-structured, authenticated backend.
- **Project Type:** REST API (backend only, no frontend)
- **Primary Users:** Developers/testers using Postman to exercise the API; represents Rocket Elevators staff managing agent and region records.

---

## 2. Project Scope

### In Scope

- CRUD operations for Agents
- CRUD operations for Regions
- Persisting data in MongoDB Atlas via Mongoose
- Middleware for request logging
- Middleware for authentication/authorization on protected routes
- Re-implementing the required Module 4 endpoints in the new architecture
- Environment-based configuration via dotenv

### Out of Scope

- Any frontend/UI
- JWT authentication as the primary auth system (only allowed as an explicit extra mile, if requested)
- Local/non-Atlas MongoDB instances
- Any framework/library not already listed in Section 4

### Feature Index

- `health.feature.md` - health check endpoint (existing)
- `agents.feature.md` - agent CRUD (built and tested; auth not yet applied)
- `regions.feature.md` - region CRUD (built and tested)
- `auth.feature.md` - authentication/authorization middleware (implemented in `baseMiddleware.js`)

---

## 3. Architecture

### Architecture Overview

An Express.js REST API following an MVC-style structure. Routes receive HTTP requests and delegate to controllers. Controllers contain business logic and talk to MongoDB Atlas through Mongoose models. Shared resources (config/mock data) live separately from feature logic.

### Repository / Project Structure

- `/src/controllers` - business logic per resource, one file per feature (e.g. `health.controller.js`, `agent.controller.js`)
- `/src/routes` - route definitions, one file per feature, mounted in `app.js`
- `/src/models` - Mongoose schemas/models, one file per resource (e.g. `agent.model.js`)
- `/src/shared/resources` - reusable data/config and middleware (e.g. legacy mock data, pricing config, access-token middleware)
- `/mongo-manager.js` - MongoDB Atlas connection setup via Mongoose
- `/app.js` - application entry point: loads env vars, middleware, routes, starts the server
- `/.env` - environment variables (never committed)

### Component Responsibilities

- **Routes:** define HTTP method + path + which controller handles it. Must not contain business logic.
- **Controllers:** handle requests, call Mongoose models, return HTTP responses. Must not define routes.
- **Models:** define Mongoose schemas (e.g. `Agent`). Controllers use models; models never import Express.
- **Shared:** reusable resources and middleware only. Must not contain controller business logic.

### Running the Project

- **Install:** `npm install`
- **Run:** `npm start` (runs `nodemon app.js`)
- **Test:** not configured yet
- **Environment variables:** `MONGO_URI`, `PORT`

---

## 4. Allowed Technologies & Constraints

### Required / Allowed Technologies

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Config:** dotenv
- **Dev tooling:** nodemon
- **API testing:** Postman

### Restricted / Prohibited Technologies

- Local MongoDB server - assignment requires MongoDB Atlas
- JWT as the primary auth mechanism - only allowed if explicitly implemented as an extra mile
- Additional frontend frameworks - no frontend is required for this module

### Technical Constraints

- `.env` must never be committed; no credentials in source code, docs, or commits
- Protected routes must return `401`/`403` for missing or invalid authorization
- The MongoDB connection must log a clear success confirmation (`connected to MongoDB`)

---

## 5. Coding Standards & Conventions

### Naming Conventions

- Files: `feature.controller.js`, `feature.routes.js` (matches existing `health.controller.js` / `health.routes.js`)
- Variables/functions: camelCase
- Mongoose models: PascalCase (e.g. `Agent`, `Region`)

### File & Folder Conventions

- Controllers live in `src/controllers/`, one file per resource
- Routes live in `src/routes/`, one file per resource, mounted in `app.js`
- Models (once added) live in `src/models/`, one file per resource

### Code Organization

- Routes only wire HTTP verb + path + controller function together
- Controllers only handle requests and call models
- New routes are mounted in `app.js` the same way `healthRoutes` is

### Formatting / Style

- ES Modules (`import`/`export`) throughout — `package.json` has `"type": "module"`
- No formatter/linter currently configured

### Maintainability Rules

- Do not add features that are not explicitly requested or specified
- Do not refactor unrelated code while implementing a feature
- Follow the existing `health.controller.js` / `health.routes.js` pattern before introducing a new one

---

## 6. Global Definition of Done

- [ ] **Implementation completeness:** every endpoint in a feature spec is implemented and reachable
- [ ] **Compliance with this specification:** follows the architecture, technology, and naming rules above
- [ ] **Testing:** manually verified in Postman with at least one success and one failure case per endpoint
- [ ] **Input validation:** required fields are validated before reaching the database
- [ ] **Error handling:** errors return a consistent JSON shape with an appropriate HTTP status code
- [ ] **Documentation:** README updated if new setup steps are introduced
- [ ] **Integration:** new routes are mounted in `app.js` following the existing pattern
- [ ] **Cleanup:** no leftover debugging `console.log`s or commented-out code

---

## 7. Cross-Feature Rules

- **Error responses:** all error responses use the same JSON shape (`success`, `error`, `message`, `timestamp`) as the existing 404 handler in `app.js`
- **Authentication:** protected routes reject requests without valid authorization with `401`/`403`
- **Environment variables:** all secrets/config are read from `process.env`, never hardcoded
