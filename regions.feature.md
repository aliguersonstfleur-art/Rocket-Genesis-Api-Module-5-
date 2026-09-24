 # Feature Specification — Region CRUD

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Region CRUD
- **Related Area:** Back-end (REST API)

---

## 1. Feature Goal

Allow Rocket Elevators to store and retrieve agent data at a regional level, so they can find the closest available agent to a customer and see regional performance (total sales, top agents, region manager).

---

## 2. Feature Scope

### In Scope

- Create a region (North, East, South, or West), one at a time
- Assign a manager agent to a newly created region
- Compute `top_agents` (top 3 by sales) and `total_sales` for a region at creation time
- Retrieve a single region's information by name
- Retrieve the top-selling agent across each region ("all-stars")

### Out of Scope

- Deleting or updating a region (not requested in this spec)
- Real-time recalculation of `total_sales`/`top_agents` after creation (not specified — see open question below)
- Agent CRUD itself (see `agents.feature.md`)

### Feature-Specific Constraints

- **Assumption (TBD):** `POST /region-create` is called once per region, accepting a `region` field identifying which region to create (North/East/South/West). Not explicitly stated in the source instructions — confirm with the assignment/coach.
- **Assumption (TBD):** `Region.manager` stores a reference (e.g. the created agent's `_id`) to the new manager Agent, rather than a full copy of their data. Confirm before finalizing the schema.

---

## 3. Requirements

### FR-01 — Create Region

**Requirement:**
The API must allow creating a region via `POST /region-create`, for one of North, East, South, or West. It must create a new Agent (via the existing Agent creation logic) to act as that region's manager, compute `top_agents` as the 3 agents in that region with the highest `sales`, and compute `total_sales` as the sum of `sales` for all agents in that region.

**Expected Result:**
A new region document is saved with `manager`, `top_agents`, and `total_sales` populated, and a new manager Agent is created for that region. If the region already exists, no region is created and an error is returned.

### FR-02 — Retrieve Region

**Requirement:**
The API must allow retrieving a single region's information via `GET /region`, accepting a `region` parameter.

**Expected Result:**
The matching region's information is returned exactly once (no duplicate entries).

### FR-03 — Retrieve All-Stars

**Requirement:**
The API must allow retrieving the top-selling agent for each region via `GET /all-stars`.

**Expected Result:**
One agent per region (the agent with the highest `sales` in that region) is returned.

---

## 4. User Flow

**Main flow**

1. Client sends a request (with a valid access token) to a region endpoint via Postman.
2. Auth middleware verifies the access token before the request reaches the controller.
3. The route passes the request to the region controller.
4. The controller calls the Region model (and, for creation, the Agent model/logic) to perform the requested operation.
5. The controller returns the result (region data or agent data) as a JSON response.

**Alternate / failure flow**

1. If the access token is missing or invalid, the API returns a 401/403 response before reaching the controller.
2. If `POST /region-create` targets a region that already exists, the API returns an error and creates nothing.
3. If `GET /region` is given a region that does not exist, the API returns an appropriate not-found response.

---

## 5. Interfaces Involved

### Pages

- N/A — no frontend

### Components

- `src/controllers/region.controller.js` *(new)* - handles region request logic
- `src/routes/region.routes.js` *(new)* - defines region endpoints
- `src/models/region.model.js` *(new)* - Mongoose schema/model for Region
- Agent model/logic *(existing, from `agents.feature.md`)* - reused to create each region's manager agent

### Endpoints

- `POST` `/region-create` - create one region (North/East/South/West), its manager agent, `top_agents`, and `total_sales`
- `GET` `/region` - retrieve one region's information by `region`
- `GET` `/all-stars` - retrieve the top-selling agent in each region

All endpoints require a valid access token.

---

## 6. Data

### Inputs

- `region` (text, required) - one of North, East, South, West - used by `POST /region-create` and `GET /region`

### Outputs / Returned Data

- Region object: `region`, `total_sales`, `manager`, `top_agents` (plus MongoDB's `_id`)
- `GET /all-stars`: a list of agent objects, one per region

### Stored / Modified Data

- Region documents are created in the `regions` collection in MongoDB Atlas
- A new Agent document is created in the `agents` collection each time a region is created (as that region's manager)

---

## 7. Validation

- **region (create):** must be one of North, East, South, West, and must not already exist - checked on server - on failure: error response, nothing created
- **region (read):** must be provided - checked on server - on failure: error response
- **access token (all routes):** must be present and valid - checked on server (middleware) - on failure: 401/403 response

---

## 8. Expected Behavior

### Success Behavior

- Create: new region saved with computed `manager`, `top_agents`, `total_sales`; response confirms success
- Read one region: that region's data returned, no duplicates
- All-stars: one top agent per region returned

### Error / Invalid Behavior

- Creating a region that already exists returns an error and no changes are made
- Requesting a region that does not exist returns an appropriate not-found/error response
- Missing/invalid access token returns 401/403 before reaching the controller

### Empty / Edge Cases

- Creating a region with no existing agents in it yet: `total_sales` = 0, `top_agents` = empty list (fewer than 3 agents may exist at creation time)

---

## 9. Acceptance Criteria

- [ ] `POST /region-create` creates the region with a manager agent, correct `top_agents`, and correct `total_sales` (FR-01)
- [ ] `POST /region-create` returns an error and creates nothing if the region already exists (FR-01)
- [ ] `GET /region?region=...` returns exactly one matching region record, with no duplicates (FR-02)
- [ ] `GET /all-stars` returns exactly one top-selling agent per region (FR-03)
- [ ] All three endpoints reject requests without a valid access token
