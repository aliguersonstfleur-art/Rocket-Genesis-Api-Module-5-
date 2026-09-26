# Feature Specification — Module 4 Endpoints

**Read `ai/ai-spec.md` before this specification.**

- **Feature Name:** Module 4 Endpoints
- **Related Area:** Backend

## 1. Feature Goal

Re-implement the required Module 4 endpoints inside the new MVC and MongoDB-backed architecture.

## 2. Feature Scope

### In scope
- `/hello`, `/status`, `/error`, `/email-list`, `/region-avg`, `/calc-residential`, `/contact-us`.

### Out of scope
- Any endpoint not listed above.

## 3. Requirements

### FR-01 — Hello
**Requirement:** `GET /hello` returns a simple greeting. Public, no access token required.

### FR-02 — Status
**Requirement:** `GET /status` returns server status information. Public, no access token required.

### FR-03 — Error
**Requirement:** `GET /error` deliberately triggers and returns a handled error response, to demonstrate error handling. Public, no access token required.

### FR-04 — Email list
**Requirement:** `GET /email-list` reads the Agents list from MongoDB and returns their email addresses. Requires a valid access token.

### FR-05 — Region average
**Requirement:** `GET /region-avg` accepts a `region` query parameter and returns the average `rating` and average `fee` of Agents in that region, read from MongoDB. Requires a valid access token.

### FR-06 — Calculate residential quote
**Requirement:** `POST /calc-residential` accepts a pricing `tier` and a number of `units`, and calculates a total price using the resource file's unit prices and installation fee percentages. Requires a valid access token.

### FR-07 — Contact us
**Requirement:** `POST /contact-us` accepts a contact message and saves it to MongoDB. Requires a valid access token.

## 4. User Flow
1. Client sends a request to one of the above endpoints.
2. Public endpoints (`/hello`, `/status`, `/error`) skip the access-token check.
3. All other endpoints require a valid access token.
4. The controller performs the corresponding logic (read agents, compute averages, calculate pricing, or save a contact message) and returns a JSON response.

## 5. Interfaces Involved
- `src/controllers/moduleFour.controller.js`
- `src/routes/moduleFour.routes.js`
- `src/models/contact.schema.js`
- `src/shared/resources/data.js` (`UNIT_PRICES`, `INSTALL_PERCENT_FEES`)

## 6. Data
- `/calc-residential` input: `tier` (`standard`, `premium`, or `excelium`), `units` (number).
- `/contact-us` input: `name`, `email`, `message`.
- `/region-avg` input: `region` (query parameter).

## 7. Validation
- `/region-avg` requires `region`.
- `/calc-residential` requires a valid `tier` and a positive `units` value.
- `/contact-us` requires `name`, `email`, and `message`.

## 8. Expected Behavior
- **Success:** Each endpoint returns `200`/`201` with the relevant data.
- **Error:** Missing/invalid input returns `400` with a clear message.

## 9. Acceptance Criteria
- [x] `/hello`, `/status`, `/error` respond without an access token (FR-01, FR-02, FR-03)
- [x] `/email-list` reads Agents from MongoDB (FR-04)
- [x] `/region-avg` computes averages from MongoDB data (FR-05)
- [x] `/calc-residential` uses the resource pricing file (FR-06)
- [x] `/contact-us` saves the submission to MongoDB (FR-07)
