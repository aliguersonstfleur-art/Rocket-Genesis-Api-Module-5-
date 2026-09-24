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
The API must allow a new agent to be created by submitting agent data in the request body.

**Expected Result:**
A new agent document is saved in MongoDB and returned in the response with a generated ID.

### FR-02 — Retrieve All Agents

**Requirement:**
The API must allow retrieval of the full list of agents.

**Expected Result:**
All agent documents currently stored in MongoDB are returned as a list.

### FR-03 — Retrieve Single Agent

**Requirement:**
The API must allow retrieval of one agent by its ID.

**Expected Result:**
The matching agent document is returned, or a not-found response if no agent has that ID.

### FR-04 — Update Agent

**Requirement:**
The API must allow updating an existing agent's fields by ID.

**Expected Result:**
The agent document is updated in MongoDB and the updated version is returned.

### FR-05 — Delete Agent

**Requirement:**
The API must allow deleting an agent by ID.

**Expected Result:**
The agent document is removed from MongoDB and a confirmation is returned.

---

## 4. User Flow

**Main flow**

1. Client sends a request to an agent endpoint (create, read, update, or delete) via Postman.
2. The route passes the request to the agent controller.
3. The controller calls the Agent model to perform the requested database operation.
4. The controller returns the result (agent data or confirmation) as a JSON response.

**Alternate / failure flow**

1. If the agent ID does not exist (read, update, delete), the API returns a 404 response with an error message.
2. If required fields are missing or invalid on create/update, the API returns a 400 response with an error message.

---

## 5. Interfaces Involved

### Pages

- N/A — no frontend

### Components

- `src/controllers/agent.controller.js` *(new)* - handles agent request logic
- `src/routes/agent.routes.js` *(new)* - defines agent endpoints
- `src/models/agent.model.js` *(new)* - Mongoose schema/model for Agent

### Endpoints

- `POST` `/agents` - create a new agent
- `GET` `/agents` - retrieve all agents
- `GET` `/agents/:id` - retrieve one agent by ID
- `PUT` `/agents/:id` - update an agent by ID
- `DELETE` `/agents/:id` - delete an agent by ID

---

## 6. Data

### Inputs

- `first_name` (text, required) - agent's first name
- `last_name` (text, required) - agent's last name
- `email` (text, required) - agent's email
- `region` (text, required) - region the agent belongs to
- `rating` (number) - agent's performance rating
- `fee` (number) - agent's fee
- `manager` (boolean) - whether the agent is a manager

### Outputs / Returned Data

- Single agent object or array of agent objects, shaped as above plus MongoDB's `_id`
- HTTP status code reflecting the result (200/201 success, 400 invalid input, 404 not found)

### Stored / Modified Data

- Agent documents are created, updated, or deleted in the `agents` collection in MongoDB Atlas

---

## 7. Validation

- **first_name, last_name, email, region:** required - checked on server - on failure: 400 response, agent not saved
- **email:** must be a valid email format - checked on server - on failure: 400 response
- **id (update/delete/read one):** must reference an existing agent - checked on server - on failure: 404 response

---

## 8. Expected Behavior

### Success Behavior

- Create: new agent is returned with a 201 status
- Read (all/one): matching agent data returned with a 200 status
- Update: updated agent returned with a 200 status
- Delete: confirmation message returned with a 200 status

### Error / Invalid Behavior

- Missing/invalid required fields on create or update return a 400 response and no database change occurs
- Requests referencing a non-existent agent ID return a 404 response

### Empty / Edge Cases

- Retrieving all agents when none exist returns an empty list with a 200 status, not an error

---

## 9. Acceptance Criteria

- [ ] Submitting valid agent data to `POST /agents` creates the agent and returns it with a 201 status (FR-01)
- [ ] `GET /agents` returns every agent currently stored (FR-02)
- [ ] `GET /agents/:id` returns the correct agent for a valid ID, and a 404 for an invalid ID (FR-03)
- [ ] `PUT /agents/:id` updates the agent's fields and returns the updated agent (FR-04)
- [ ] `DELETE /agents/:id` removes the agent and returns a confirmation (FR-05)
