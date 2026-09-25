# Feature Specification — Get All Agents

**Read `ai/ai-spec.md` before this specification.**

- **Feature Name:** Get All Agents
- **Related Area:** Backend

## 1. Feature Goal

Return every Agent currently stored in MongoDB.

## 2. Feature Scope

### In scope
- Returning the full Agent list sorted alphabetically by `last_name`.

### Out of scope
- Filtering by region (see `get-agents-by-region.feature.md`).

## 3. Requirements

### FR-01 — List all Agents sorted by last name
**Requirement:** `GET /agents` returns all Agents sorted alphabetically by `last_name`.
**Expected Result:** Response is an array sorted A→Z by `last_name`.

## 4. User Flow
1. Client sends `GET /agents` with a valid access token.
2. The middleware validates the token.
3. The controller queries all Agents sorted by `last_name`.
4. The list is returned.

## 5. Interfaces Involved
- `GET /agents`
- `src/controllers/agent.controller.js`
- `src/models/agent.schema.js`

## 6. Data
- Output: array of Agent documents.

## 7. Validation
- No input required.

## 8. Expected Behavior
- **Success:** `200` with the sorted Agent array.
- **Empty:** `200` with an empty array when no Agents exist.

## 9. Acceptance Criteria
- [x] `/agents` is implemented and responds successfully (FR-01)
- [x] Agents are returned alphabetically by `last_name` (FR-01)
