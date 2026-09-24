# Feature Specification — Agent CRUD

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Agent CRUD
- **Related Area:** Back-end (REST API)

---

## 1. Feature Goal

Allow the Rocket Elevators application to create, read, update, and delete agent records, persisted in MongoDB Atlas, replacing the hardcoded agent data used in Module 4.

---

## 2. Feature Scope

### In Scope

- Create a new agent
- Retrieve all agents
- Retrieve a single agent by ID
- Update an existing agent
- Delete an agent

### Out of Scope

- Agent authentication/login (agents are data records, not user accounts)
- Assigning agents to elevator installation jobs (not part of this feature)
- Region management itself (see `regions.feature.md`)

### Feature-Specific Constraints

- N/A — no exceptions to `ai-spec.md` identified yet

---

## 3. Requirements

### FR-01 — Create Agent

**Requirement:**
The API must allow a new agent to be created via `POST /agent-create`. Required fields are `first_name`, `last_name`, `email`, and `region`. All other fields use default values; `sales` defaults to `0`.

**Expected Result:**
A new agent document is saved in MongoDB with `sales` initialized to 0, and the response communicates confirmation status.

### FR-02 — Retrieve All Agents

**Requirement:**
The API must allow retrieval of all agents via `GET /agents`, sorted alphabetically by `last_name`.

**Expected Result:**
All agent documents currently stored in MongoDB are returned as a list, sorted alphabetically by `last_name`.

### FR-03 — Retrieve Agents By Region

**Requirement:**
The API must allow retrieval of agents filtered by region via `GET /agents-by-region`, using a required `region` query parameter, sorted by `rating`.

**Expected Result:**
All agents matching the given region are returned, sorted by `rating`.

### FR-04 — Update Agent Info

**Requirement:**
The API must allow updating an existing agent via `PUT`/`PATCH /agent-update-info`. Only `first_name`, `last_name`, `email`, and `region` may be updated.

**Expected Result:**
The agent document is updated in MongoDB and the updated version is returned. If the agent does not exist, an error is returned.

### FR-05 — Delete Agent

**Requirement:**
The API must allow deleting an agent via `DELETE /agent-delete`, accepting any valid parameters to locate the agent. Before deleting, the query must match exactly one agent.

**Expected Result:**
If the query matches exactly one agent, that agent is deleted and confirmed. If it matches zero or multiple agents, no deletion occurs and a specific error message is returned.

---

## 4. User Flow

**Main flow**

1. Client sends a request (with a valid access token) to an agent endpoint via Postman.
2. Auth middleware verifies the access token before the request reaches the controller.
3. The route passes the request to the agent controller.
4. The controller calls the Agent model to perform the requested database operation.
5. The controller returns the result (agent data or confirmation) as a JSON response.

**Alternate / failure flow**

1. If the access token is missing or invalid, the API returns a 401/403 response before reaching the controller.
2. If the agent being updated does not exist, the API returns an error response.
3. If a delete query matches zero or more than one agent, the API returns a specific error message and does not delete anything.
4. If required fields are missing on create, the API returns a 400 response with an error message.

---

## 5. Interfaces Involved

### Pages

- N/A — no frontend

### Components

- `src/controllers/agent.controller.js` *(built)* - handles agent request logic
- `src/routes/agent.routes.js` *(built)* - defines agent endpoints
- `src/models/agent.model.js` *(built)* - Mongoose schema/model for Agent
- `src/shared/middleware/baseMiddleware.js` *(built)* - validates access tokens

### Endpoints

- `POST` `/agent-create` - create a new agent (requires `first_name`, `last_name`, `email`, `region`; `sales` defaults to 0)
- `GET` `/agents` - retrieve all agents, sorted alphabetically by `last_name`
- `GET` `/agents-by-region` - retrieve agents for a given `region` (query param), sorted by `rating`
- `PUT`/`PATCH` `/agent-update-info` - update `first_name`, `last_name`, `email`, or `region` on an existing agent
- `DELETE` `/agent-delete` - delete an agent matched by query parameters, only if exactly one agent matches

All endpoints require a valid access token.

---

## 6. Data

### Inputs

- `first_name` (text, required on create) - agent's first name
- `last_name` (text, required on create) - agent's last name
- `email` (text, required on create) - agent's email
- `region` (text, required on create) - region the agent belongs to
- `rating` (number, optional, default TBD) - agent's performance rating
- `fee` (number, optional, default TBD) - agent's fee
- `sales` (number, defaults to 0) - agent's sales total
- `manager` (boolean, optional, default TBD) - whether the agent is a manager

### Outputs / Returned Data

- Single agent object or array of agent objects, shaped as above plus MongoDB's `_id`
- HTTP status code reflecting the result, plus a confirmation status message on create/update/delete

### Stored / Modified Data

- Agent documents are created, updated, or deleted in the `agents` collection in MongoDB Atlas

---

## 7. Validation

- **first_name, last_name, email, region (create):** required - checked on server - on failure: 400 response, agent not saved
- **access token (all routes):** must be present and valid - checked on server (middleware) - on failure: 401/403 response
- **agent-update-info:** only `first_name`, `last_name`, `email`, `region` may change; agent must already exist - checked on server - on failure: error response, no update applied
- **agent-delete:** the query must resolve to exactly one agent - checked on server - on failure: specific error message, no deletion

---

## 8. Expected Behavior

### Success Behavior

- Create: new agent saved with `sales` = 0, response confirms success
- Read all: full agent list returned, sorted alphabetically by `last_name`
- Read by region: matching agents returned, sorted by `rating`
- Update: allowed fields updated, updated agent returned
- Delete: single matched agent removed, confirmation returned

### Error / Invalid Behavior

- Missing required fields on create returns a 400 response and no database change occurs
- Update on a non-existent agent returns an error and no database change occurs
- Delete query matching zero or multiple agents returns a specific error and no deletion occurs
- Missing/invalid access token returns 401/403 before reaching the controller

### Empty / Edge Cases

- `GET /agents` when no agents exist returns an empty list with a 200 status, not an error
- `GET /agents-by-region` for a region with no agents returns an empty list, not an error

---

## 9. Acceptance Criteria

- [x] Submitting valid required fields to `POST /agent-create` creates the agent with `sales` = 0 and returns confirmation (FR-01)
- [x] `GET /agents` returns every agent, sorted alphabetically by `last_name` (FR-02)
- [x] `GET /agents-by-region?region=...` returns only matching agents, sorted by `rating` (FR-03)
- [x] `PUT`/`PATCH /agent-update-info` updates only the allowed fields, and returns an error if the agent doesn't exist (FR-04)
- [x] `DELETE /agent-delete` deletes only when exactly one agent matches, and returns a specific error otherwise (FR-05)
- [x] All five endpoints reject requests without a valid access token
