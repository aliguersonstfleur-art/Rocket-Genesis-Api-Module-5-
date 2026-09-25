# Feature Specification — Get Agents By Region

**Read `ai/ai-spec.md` before this specification.**

- **Feature Name:** Get Agents By Region
- **Related Area:** Backend

## 1. Feature Goal

Return only the Agents belonging to one region, ranked by rating.

## 2. Feature Scope

### In scope
- Filtering Agents by a required `region` query parameter.
- Sorting the result by `rating`, highest first.

### Out of scope
- Returning all Agents regardless of region (see `get-agents.feature.md`).

## 3. Requirements

### FR-01 — Region parameter required
**Requirement:** `GET /agents-by-region` requires a `region` query parameter.
**Expected Result:** Missing `region` returns a `400` error.

### FR-02 — Sorted by rating
**Requirement:** Matching Agents are returned sorted by `rating`, highest to lowest.
**Expected Result:** Result array is ordered by descending `rating`.

## 4. User Flow
1. Client sends `GET /agents-by-region?region=North` with a valid access token.
2. The controller validates the `region` parameter.
3. Agents in that region are queried and sorted by `rating` descending.
4. The list is returned.

## 5. Interfaces Involved
- `GET /agents-by-region`
- `src/controllers/agent.controller.js`

## 6. Data
- Input: `region` (required query parameter).
- Output: array of Agents in that region.

## 7. Validation
- Missing `region` → `400` response.

## 8. Expected Behavior
- **Success:** `200` with Agents sorted by rating (highest first).
- **Error:** `400` when `region` is missing.
- **Empty:** `200` with an empty array if no Agents exist in that region.

## 9. Acceptance Criteria
- [x] The endpoint is implemented and responds successfully (FR-01)
- [x] `region` query parameter is required (FR-01)
- [x] Returned list is sorted by rating, highest to lowest (FR-02)
