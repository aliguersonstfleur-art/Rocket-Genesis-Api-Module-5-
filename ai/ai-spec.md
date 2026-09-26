# Project-Wide AI Specification

## Project Identity

- **Name:** Rocket Genesis API
- **Description:** A protected Express REST API for Rocket Elevators that stores and manages Agent and Region data.
- **Type:** Backend REST API
- **Users:** Rocket Elevators staff and API testers using Postman.

## Scope

### In scope

- MongoDB Atlas persistence through Mongoose
- Agent and Region operations
- Module 4 endpoint migration
- Authentication and request logging middleware
- Postman API testing and documentation

### Out of scope

- Frontend application
- Local MongoDB server
- JWT authentication unless explicitly requested as an extra mile

## Architecture

- `app.js` loads configuration, middleware, routes, and starts Express.
- `src/controllers` contains request and business logic.
- `src/routes` contains HTTP methods and endpoint paths.
- `src/models` contains Mongoose schemas and models.
- `src/shared/resources` contains reusable data such as unit prices and installation fees.
- `src/shared/middleware` contains reusable logging and authorization middleware.
- MongoDB Atlas stores persistent Agents, Regions, and contact data.

Controllers call models. Routes call controllers. Clients never access MongoDB directly.

## Allowed Technologies and Constraints

- Node.js, Express, Mongoose, MongoDB Atlas, dotenv, nodemon, and Postman.
- Use ES Modules because `package.json` sets `"type": "module"`.
- Store secrets only in `.env`; never commit credentials.
- Protected routes compare the `Authorization` header with `ACCESS_TOKEN` from `.env`.
- `/hello`, `/status`, and `/error` are public. Other routes require authorization.

## Coding Conventions

- Use camelCase for variables and functions.
- Use PascalCase for Mongoose models.
- Use `*.controller.js`, `*.routes.js`, and `*.schema.js` naming.
- Keep routes focused on wiring and controllers focused on application logic.
- Do not add unspecified features or refactor unrelated code.

## Global Definition of Done

- [ ] Required endpoint behavior is implemented and tested in Postman.
- [ ] The relevant feature specification acceptance criteria are satisfied.
- [ ] Inputs are validated and errors return clear status messages.
- [ ] Authentication and logging rules are applied consistently.
- [ ] README and Postman collection are updated.
- [ ] No credentials, temporary files, or debugging code are committed.
- [ ] Completed feature branches are merged into `dev`, then `dev` is merged into `main`.

## Cross-Feature Rules

- Protected requests use `Authorization: <ACCESS_TOKEN>`.
- Error responses include a clear message and suitable HTTP status.
- Agent data uses the fields `first_name`, `last_name`, `email`, `region`, `rating`, `fee`, `sales`, and `manager`.
- Region data uses `region`, `address`, `total_sales`, `manager`, and `top_agents`.
