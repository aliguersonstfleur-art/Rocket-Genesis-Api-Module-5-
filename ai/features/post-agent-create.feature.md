# Feature Specification — Create Agent

**Read `ai/ai-spec.md` before this specification.**

- **Feature Name:** Create Agent
- **Related Area:** Backend

## 1. Feature Goal

Allow a new Agent record to be created and persisted in MongoDB.

## 2. Feature Scope

### In scope
- Creating a single Agent with required and default fields.

### Out of scope
- Updating or deleting Agents (see their own specs).

## 3. Requirements

### FR-01 — Create Agent
**Requirement:** `POST /agent-create` accepts `first_name`, `last_name`, `email`, `region` as required fields. All other fields may use defaults.
**Expected Result:** A new Agent document is saved with `sales` defaulting to `0`.

### FR-02 — Confirmation message
**Requirement:** The endpoint must return a confirmation message indicating success.
**Expected Result:** Response includes `"message": "Agent created successfully"` plus the saved Agent.

## 4. User Flow
1. Client sends `POST /agent-create` with a JSON body and a valid access token.
2. The middleware validates the token.
3. The controller validates required fields.
4. The Agent is saved and returned.

## 5. Interfaces Involved
- `POST /agent-create`
- `src/controllers/agent.controller.js`
- `src/models/agent.schema.js`

## 6. Data
- Inputs: `first_name`, `last_name`, `email`, `region` (required); `rating`, `fee`, `sales`, `manager` (optional, defaulted).
- Output: created Agent document with `_id`.

## 7. Validation
- Missing required fields → `400` response, no document created.
- `sales` always defaults to `0` when omitted.

## 8. Expected Behavior
- **Success:** `201` with confirmation message and saved Agent.
- **Error:** `400` when required fields are missing.

## 9. Acceptance Criteria
- [x] `/agent-create` is implemented and responds successfully (FR-01)
- [x] Required fields are `first_name`, `last_name`, `email`, `region` (FR-01)
- [x] `sales` defaults to `0` (FR-01)
- [x] A confirmation message is returned on success (FR-02)
