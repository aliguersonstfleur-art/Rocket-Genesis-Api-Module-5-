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
└── src
	├── controllers
	│   ├── agent.controller.js
	│   ├── health.controller.js
	│   └── region.controller.js
	├── models
	│   ├── agent.schema.js
	│   └── region.schema.js
	├── routes
	│   ├── agent.routes.js
	│   ├── health.routes.js
	│   └── region.routes.js
	└── shared
		├── middleware
		│   └── baseMiddleware.js
		└── resources
			└── data.js
├── ai
│   ├── ai-spec.md
│   └── features
│       └── schemas.feature.md
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

### Health

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/hello` | Health check. |

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
| `POST` | `/region-create` | Create a North, East, South, or West Region. |
| `GET` | `/region?region=North` | Return one Region and its Agent references. |
| `GET` | `/all-stars` | Return the highest-sales Agent for each Region. |

## Author

**Aliguerson St Fleur**

- GitHub: [aliguersonstfleur-art](https://github.com/aliguersonstfleur-art)
