# Feature Specification — Update Agent Info

**Read `ai/ai-spec.md` before this specification.**

- **Feature Name:** Update Agent Info
- **Related Area:** Backend

## 1. Feature Goal

Allow limited editing of an existing Agent's contact and region information.

## 2. Feature Scope

### In scope
- Updating `first_name`, `last_name`, `email`, `region` on an existing Agent identified by `_id`.

### Out of scope
- Updating `sales`, `rating`, `fee`, or `manager` through this endpoint.

## 3. Requirements

### FR-01 — Restricted fields
**Requirement:** `PUT`/`PATCH /agent-update-info` only allows updating `first_name`, `last_name`, `email`, `region`.
**Expected Result:** Any other submitted field is ignored.

### FR-02 — Not found handling
**Requirement:** If the Agent identified by `_id` does not exist, return a clear error message.
**Expected Result:** `404` response with an explanatory message, no document changed.

## 4. User Flow
1. Client sends `PUT`/`PATCH /agent-update-info` with `_id` and the fields to change, plus a valid access token.
2. The controller builds an update using only allowed fields.
3. Mongoose updates the Agent matching `_id`.
4. The updated Agent is returned, or a not-found error if no match exists.

## 5. Interfaces Involved
- `PUT`/`PATCH /agent-update-info`
- `src/controllers/agent.controller.js`

## 6. Data
- Input: `_id` (required), plus any of `first_name`, `last_name`, `email`, `region`.
- Output: updated Agent document.

## 7. Validation
- Missing `_id` → `400` response.
- `_id` not matching any Agent → `404` response.

## 8. Expected Behavior
- **Success:** `200` with the updated Agent.
- **Error:** `404` when the Agent does not exist.

## 9. Acceptance Criteria
- [x] The endpoint is implemented and responds successfully (FR-01)
- [x] Only `first_name`, `last_name`, `email`, `region` may be updated (FR-01)
- [x] A clear error message is returned if the Agent is not found (FR-02)
