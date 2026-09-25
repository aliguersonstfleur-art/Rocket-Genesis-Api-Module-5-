# Feature Specification — Middleware

**Read `ai/ai-spec.md` before this specification.**

- **Feature Name:** Middleware
- **Related Area:** Backend

## 1. Feature Goal

Provide consistent request logging and authorization enforcement across the API.

## 2. Feature Scope

### In scope
- Logging every incoming request.
- Enforcing the access token on all routes except `/hello`, `/status`, `/error`.

### Out of scope
- JWT-based authentication (extra mile only).

## 3. Requirements

### FR-01 — Request logging
**Requirement:** A middleware logs, for every request: HTTP method, route called, and the full date/time.
**Expected Result:** Every request produces one log line with these three details.

### FR-02 — Authorization enforcement
**Requirement:** Middleware compares the incoming `Authorization` header with `ACCESS_TOKEN` from `.env` for all routes except `/hello`, `/status`, and `/error`.
**Expected Result:** Protected routes reject requests with a missing or incorrect header; the three listed routes are never blocked.

## 4. User Flow
1. A request arrives at the Express app.
2. The logging middleware records the method, route, and timestamp.
3. If the route is not `/hello`, `/status`, or `/error`, the authorization middleware checks the header.
4. If authorized (or exempt), the request reaches its controller.

## 5. Interfaces Involved
- `src/shared/middleware/loggerMiddleware.js`
- `src/shared/middleware/baseMiddleware.js`
- `app.js`

## 6. Data
- No request body is required; the logger reads `req.method` and `req.originalUrl`.

## 7. Validation
- Missing/incorrect `Authorization` header on a protected route → `403 Access Forbidden`.

## 8. Expected Behavior
- **Success:** Every request is logged; protected routes require the correct token.
- **Error:** Protected routes return `403` without the correct token.

## 9. Acceptance Criteria
- [x] Every request is logged with method, route, and full date/time (FR-01)
- [x] `/hello`, `/status`, `/error` are never blocked by the authorization check (FR-02)
- [x] All other routes require a correct `Authorization` header (FR-02)
