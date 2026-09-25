# Feature Specification — Delete Agent

**Read `ai/ai-spec.md` before this specification.**

- **Feature Name:** Delete Agent
- **Related Area:** Backend

## 1. Feature Goal

Allow exactly one Agent to be safely deleted using flexible identifying parameters.

## 2. Feature Scope

### In scope
- Deleting a single Agent matched by any provided query parameters.
- Refusing deletion when the match is ambiguous or empty.

### Out of scope
- Bulk deletion of multiple Agents.

## 3. Requirements

### FR-01 — Flexible query parameters
**Requirement:** `DELETE /agent-delete` accepts any valid query parameters normally used to identify an Agent.
**Expected Result:** The parameters are used directly as a MongoDB filter.

### FR-02 — Exactly one match required
**Requirement:** The endpoint must verify that only one Agent matches before deleting.
**Expected Result:** Zero or multiple matches prevent deletion.

### FR-03 — Specific error on invalid match
**Requirement:** If the request is invalid or multiple Agents match, return a specific error message and delete nothing.
**Expected Result:** Error response states how many Agents matched.

## 4. User Flow
1. Client sends `DELETE /agent-delete` with query parameters and a valid access token.
2. The controller finds all Agents matching the parameters.
3. If exactly one match exists, it is deleted and confirmed.
4. Otherwise, deletion is refused with an explanatory error.

## 5. Interfaces Involved
- `DELETE /agent-delete`
- `src/controllers/agent.controller.js`

## 6. Data
- Input: any Agent field(s) as query parameters.
- Output: the deleted Agent document, or an error message.

## 7. Validation
- No query parameters → `400` response.
- Zero matches → `404` response.
- Multiple matches → `400` response naming the match count.

## 8. Expected Behavior
- **Success:** `200` with the deleted Agent when exactly one match exists.
- **Error:** No deletion occurs for zero or multiple matches.

## 9. Acceptance Criteria
- [x] The endpoint is implemented and responds successfully (FR-01)
- [x] The endpoint accepts any valid query parameters (FR-01)
- [x] The endpoint verifies exactly one match before deleting (FR-02)
- [x] Invalid or multiple matches return a specific error and no deletion (FR-03)
