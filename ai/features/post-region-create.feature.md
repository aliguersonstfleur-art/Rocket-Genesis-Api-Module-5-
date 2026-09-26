# Feature Specification — Create Region

**Read `ai/ai-spec.md` before this specification.**

- **Feature Name:** Create Region
- **Related Area:** Backend

## 1. Feature Goal

Allow Rocket Elevators to create regional records with a manager, top agents, and total sales, either individually or all at once.

## 2. Feature Scope

### In scope
- Creating a single named region (North, East, South, West).
- Creating all four regions when no region is specified.
- Creating a new manager Agent for each region using the Agent creation logic.
- Computing `top_agents` and `total_sales`.

### Out of scope
- Updating or deleting Regions.

## 3. Requirements

### FR-01 — Create one or all regions
**Requirement:** `POST /region-create` creates a single named region, or all four regions (North, East, South, West) when no `region` is provided.
**Expected Result:** Sending `{ "region": "North" }` creates only North; sending an empty body creates all four.

### FR-02 — Manager agent per region
**Requirement:** Each region creation uses the Agent creation logic to create a new Agent with `manager: true` for that region.
**Expected Result:** A new manager Agent exists for every created region.

### FR-03 — Top agents
**Requirement:** `top_agents` contains the 3 Agents with the highest `sales` in that region.
**Expected Result:** At most 3 Agent references are stored, ordered by sales.

### FR-04 — Total sales
**Requirement:** `total_sales` equals the sum of `sales` for all Agents in that region.
**Expected Result:** The stored value matches the computed sum at creation time.

### FR-05 — Duplicate protection
**Requirement:** If a region already exists, return a clear error message and create nothing.
**Expected Result:** No duplicate Region document is ever created.

## 4. User Flow
1. Client sends `POST /region-create` with an optional `region` field and a valid access token.
2. If `region` is provided, only that region is processed; otherwise all four regions are processed in turn.
3. For each region: check for duplicates, create a manager Agent, compute `top_agents` and `total_sales`, save the Region.
4. The created Region(s) are returned.

## 5. Interfaces Involved
- `POST /region-create`
- `src/controllers/region.controller.js`
- `src/models/region.schema.js`
- Agent creation logic from `agents.feature.md`

## 6. Data
- Input: `region` (optional; one of North, East, South, West).
- Output: created Region document(s) with `manager`, `top_agents`, `total_sales`.

## 7. Validation
- `region`, if provided, must not already exist.
- `region`, if provided, should be one of the four valid names.

## 8. Expected Behavior
- **Success:** `201` with the created Region(s).
- **Error:** `400` when a targeted region already exists.

## 9. Acceptance Criteria
- [x] The endpoint is implemented and responds successfully (FR-01)
- [x] Individual regions can be created (FR-01)
- [x] All regions can be created when no region is provided (FR-01)
- [x] `top_agents` includes the 3 agents with the highest sales (FR-03)
- [x] A new manager Agent is created per region (FR-02)
- [x] `total_sales` is the sum of sales for agents in that region (FR-04)
- [x] A clear error is returned if the region already exists (FR-05)
