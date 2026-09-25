# Feature Specification — Get All-Stars

**Read `ai/ai-spec.md` before this specification.**

- **Feature Name:** Get All-Stars
- **Related Area:** Backend

## 1. Feature Goal

Identify Rocket Elevators' top-performing Agent in each region.

## 2. Feature Scope

### In scope
- Returning the single highest-sales Agent per existing region.

### Out of scope
- Returning multiple top agents per region (see `top_agents` in Region creation).

## 3. Requirements

### FR-01 — Top agent per region
**Requirement:** `GET /all-stars` returns, for each region, the Agent with the highest `sales`.
**Expected Result:** Response array contains at most one Agent per existing region.

## 4. User Flow
1. Client sends `GET /all-stars` with a valid access token.
2. The controller lists existing regions.
3. For each region, the Agent with the highest `sales` is found.
4. The resulting list is returned.

## 5. Interfaces Involved
- `GET /all-stars`
- `src/controllers/region.controller.js`

## 6. Data
- Output: array of Agent documents, one per region.

## 7. Validation
- No input required.

## 8. Expected Behavior
- **Success:** `200` with one top Agent per region.
- **Empty:** `200` with an empty array if no regions exist.

## 9. Acceptance Criteria
- [x] The endpoint is implemented and responds successfully (FR-01)
- [x] For each region, the agent with the highest sales is returned (FR-01)
