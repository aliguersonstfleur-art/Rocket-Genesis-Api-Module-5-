# Rocket Genesis API

## Project Description

Rocket Genesis API is a backend REST API for Rocket Elevators. It stores and manages Agent and Region information in MongoDB Atlas instead of relying only on hardcoded data.

The API is designed for Rocket Elevators staff and is tested with Postman. It supports agent management, regional information, sales summaries, and access-token protection for private data.

## Tech Stack

- **Backend:** Node.js and Express
- **Database:** MongoDB Atlas
- **Database tools:** Mongoose and MongoDB
- **Configuration:** dotenv
- **Development server:** nodemon
- **API testing:** Postman
- **Version control:** Git and GitHub

## Project Structure

```text
.
├── app.js
├── mongo-manager.js
├── package.json
├── .env
├── ai
│   ├── ai-spec.md
│   └── features
│       ├── schemas.feature.md
│       ├── post-agent-create.feature.md
│       ├── get-agents.feature.md
│       ├── get-agents-by-region.feature.md
│       ├── put-agent-update.feature.md
│       ├── delete-agent.feature.md
│       ├── post-region-create.feature.md
│       ├── get-region.feature.md
│       ├── get-all-stars.feature.md
│       ├── module-four-endpoints.feautre.md
│       └── middleware.feature.md
└── src
    ├── controllers
    │   ├── agent.controller.js
    │   ├── health.controller.js
    │   ├── moduleFour.controller.js
    │   └── region.controller.js
    ├── models
    │   ├── agent.schema.js
    │   ├── contact.schema.js
    │   └── region.schema.js
    ├── routes
    │   ├── agent.routes.js
    │   ├── health.routes.js
    │   ├── moduleFour.routes.js
    │   └── region.routes.js
    └── shared
        ├── middleware
        │   ├── baseMiddleware.js
        │   └── loggerMiddleware.js
        └── resources
            └── data.js
```

- **Controllers:** contain request and database logic.
- **Models:** define the Mongoose data schemas.
- **Routes:** connect HTTP methods and URLs to controllers.
- **Middleware:** checks the access token before protected routes run.
- **Shared resources:** contain reusable application resources and legacy data.

## Installation and Setup

### 1. Clone the repository

```bash
git clone git@github.com:aliguersonstfleur-art/Rocket-Genesis-Api-Module-5-.git
cd Rocket-Genesis-Api-Module-5-
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the environment file

Create a `.env` file in the project root:

```env
MONGO_URI=your-mongodb-atlas-connection-string
PORT=3004
ACCESS_TOKEN=your-access-token
```

Do not commit `.env` or expose its values. The MongoDB connection string must use MongoDB Atlas.

### 4. Start the application

```bash
npm start
```

The API runs at `http://localhost:3004` by default. A successful database connection displays `connected to MongoDB` in the terminal.

## Environment Variables

| Variable | Description |
| --- | --- |
| `MONGO_URI` | MongoDB Atlas connection string used by Mongoose. |
| `PORT` | Port used by the Express server. Defaults to `3004`. |
| `ACCESS_TOKEN` | Token that must be sent in the `Authorization` header for protected routes. |

## API Documentation

Protected endpoints require this header:

```text
Authorization: your-access-token
```

### Health and Module 4 Endpoints

| Method | Endpoint | Auth required | Purpose |
| --- | --- | --- | --- |
| `GET` | `/hello` | No | Health check. |
| `GET` | `/status` | No | Server status and uptime. |
| `GET` | `/error` | No | Deliberately triggers a handled error. |
| `GET` | `/email-list` | Yes | Returns every Agent's email from MongoDB. |
| `GET` | `/region-avg?region=North` | Yes | Average rating and fee for a region. |
| `POST` | `/calc-residential` | Yes | Calculates a residential quote (`tier`, `units`). |
| `POST` | `/contact-us` | Yes | Saves a contact message to MongoDB. |

### Agents

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/agent-create` | Create an Agent. |
| `GET` | `/agents` | Return all Agents sorted by last name. |
| `GET` | `/agents-by-region?region=North` | Return Agents for a region sorted by rating. |
| `PUT` or `PATCH` | `/agent-update-info` | Update an Agent's first name, last name, email, or region. |
| `DELETE` | `/agent-delete?_id=agent-id` | Delete exactly one Agent matched by the query. |

### Regions

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/region-create` | Create one region (`{ "region": "North" }`) or all four regions (empty body). |
| `GET` | `/region?region=North` | Return one Region and its Agent references. |
| `GET` | `/all-stars` | Return the highest-sales Agent for each Region. |

All Agent and Region endpoints above require the `Authorization` header.

## Git Workflow

This project follows a `main` → `dev` → `feature/*` branching model. Feature branches are created from `dev`, merged back into `dev` when complete, and `dev` is merged into `main` only once the module is ready for submission. Only `main` is graded.

## Author

**Aliguerson St Fleur**

- GitHub: [aliguersonstfleur-art](https://github.com/aliguersonstfleur-art)
