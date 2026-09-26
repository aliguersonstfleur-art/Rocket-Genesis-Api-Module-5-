# Feature Specification — Get Region

**Read `ai/ai-spec.md` before this specification.**

- **Feature Name:** Get Region
- **Related Area:** Backend

## 1. Feature Goal

Return the stored information for one region.

## 2. Feature Scope

### In scope
- Returning a single Region's full information by name.

### Out of scope
- Returning all regions at once.

## 3. Requirements

### FR-01 — Region parameter
**Requirement:** `GET /region` accepts a `region` parameter.
**Expected Result:** Missing `region` returns a `400` error.

### FR-02 — Full region information, no duplicates
**Requirement:** The endpoint returns all information for that region without duplicated region objects.
**Expected Result:** Exactly one Region object is returned per matching region.

## 4. User Flow
1. Client sends `GET /region?region=North` with a valid access token.
2. The controller looks up the single matching Region document.
3. Manager and top agent references are populated with full Agent data.
4. The Region is returned.

## 5. Interfaces Involved
- `GET /region`
- `src/controllers/region.controller.js`

## 6. Data
- Input: `region` (required query parameter).
- Output: one Region object with populated `manager` and `top_agents`.

## 7. Validation
- Missing `region` → `400` response.
- Unknown `region` → `404` response.

## 8. Expected Behavior
- **Success:** `200` with the single Region object.
- **Error:** `404` when the region does not exist.

## 9. Acceptance Criteria
- [x] The endpoint is implemented and responds successfully (FR-01)
- [x] The endpoint accepts a `region` parameter (FR-01)
- [x] All region information is returned (FR-02)
- [x] The response contains no duplicated region objects (FR-02)
