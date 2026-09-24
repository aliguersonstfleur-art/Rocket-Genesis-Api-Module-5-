# Feature Specification — Database Schemas

**Read `ai/ai-spec.md` before this specification.**

- **Feature Name:** Agent and Region schemas
- **Related Area:** Backend database

## 1. Feature Goal

Define the persistent data shapes used by the API so MongoDB documents have the fields required by Rocket Elevators.

## 2. Feature Scope

### In scope

- Define the Agent schema and its required fields.
- Define the Region schema and its required fields and Agent references.

### Out of scope

- Endpoint behavior and authentication.
- Frontend pages.

## 3. Requirements

### FR-01 — Agent schema

The Agent schema must define `first_name`, `last_name`, `email`, `region`, `rating`, `fee`, `sales`, and `manager`.

**Expected result:** New Agent documents follow this shape, and `sales` defaults to `0`.

### FR-02 — Region schema

The Region schema must define `region`, `address`, `total_sales`, `manager`, and `top_agents`.

**Expected result:** Region documents can store the region address, sales total, manager Agent reference, and top Agent references.

## 4. User Flow

1. An endpoint receives data.
2. The controller uses the relevant Mongoose model.
3. Mongoose validates the document against the schema before saving it.

## 5. Interfaces Involved

- `src/models/agent.schema.js` - Agent schema/model.
- `src/models/region.schema.js` - Region schema/model.

## 6. Data

- Agent fields: `first_name`, `last_name`, `email`, `region`, `rating`, `fee`, `sales`, `manager`.
- Region fields: `region`, `address`, `total_sales`, `manager`, `top_agents`.

## 7. Validation

- Agent `first_name`, `last_name`, `email`, and `region` are required.
- Agent `sales` defaults to `0`.
- Region `region` is required and unique.
- Region `manager` and `top_agents` reference Agent documents.

## 8. Expected Behavior

### Success Behavior

- Valid Agent and Region documents can be saved.

### Error / Invalid Behavior

- Missing required fields prevent invalid documents from being saved.

### Empty / Edge Cases

- New Agents without a sales value receive `sales: 0`.

## 9. Acceptance Criteria

- [ ] `agent.schema.js` defines all eight Agent fields (FR-01).
- [ ] `region.schema.js` defines all five Region fields (FR-02).
- [ ] A new Agent receives `sales: 0` when sales is omitted (FR-01).
