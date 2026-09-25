# Feature Specification — Database Schemas

**Read `ai/ai-spec.md` before this specification.**

* **Feature Name:** Agent and Region Schemas
* **Related Area:** Backend database

## 1. Feature Goal

Define the Mongoose schemas/models used to persist Agent and Region data in MongoDB Atlas.

The schemas must define the required fields used by the Rocket Elevators application and provide the expected defaults and validation behavior required by the Module 5 assignment.

## 2. Feature Scope

### In Scope

* Define the Agent schema and its required fields.
* Define the Region schema and its required fields.
* Define the expected default value for Agent `sales`.
* Define the data types and validation rules required by the application.
* Provide Mongoose models that can be used by controllers to interact with MongoDB.

### Out of Scope

* Agent CRUD endpoint behavior.
* Region CRUD endpoint behavior.
* Authentication and authorization.
* Request logging middleware.
* Frontend pages or components.
* Postman testing.

## 3. Requirements

### FR-01 — Agent Schema

The Agent schema must define the following eight fields:

* `first_name`
* `last_name`
* `email`
* `region`
* `rating`
* `fee`
* `sales`
* `manager`

**Expected Result:**

Agent documents can be stored in MongoDB using the required fields. The `sales` field must default to `0` when a value is not provided.

### FR-02 — Region Schema

The Region schema must define the following five fields:

* `region`
* `address`
* `total_sales`
* `manager`
* `top_agents`

**Expected Result:**

Region documents can be stored in MongoDB using the required Region fields and can contain the information needed to represent regional management, sales totals, and top agents.

## 4. User Flow

1. An API request provides data for an Agent or Region.
2. The appropriate controller uses the corresponding Mongoose model.
3. Mongoose applies the appropriate schema rules and defaults.
4. If the document satisfies the schema requirements, it can be saved to MongoDB Atlas.
5. If required data is missing or invalid according to the schema, the document is rejected and an error is returned to the application.

## 5. Interfaces Involved

### Models / Schemas

* `src/models/agent.schema.js` — defines the Agent schema/model.
* `src/models/region.schema.js` — defines the Region schema/model.

### Database

* MongoDB Atlas — persistent storage for Agent and Region documents.
* Mongoose — ODM used by the application to define schemas and interact with MongoDB.

### Pages

* N/A — this is a backend-only feature.

### Endpoints

* N/A — endpoint behavior is handled by the individual endpoint feature specifications.

## 6. Data

### Agent

The Agent schema contains:

| Field        | Purpose                                  |
| ------------ | ---------------------------------------- |
| `first_name` | Agent's first name                       |
| `last_name`  | Agent's last name                        |
| `email`      | Agent's email address                    |
| `region`     | Region assigned to the agent             |
| `rating`     | Agent's performance rating               |
| `fee`        | Agent's fee                              |
| `sales`      | Agent's sales total                      |
| `manager`    | Indicates whether the agent is a manager |

### Region

The Region schema contains:

| Field         | Purpose                      |
| ------------- | ---------------------------- |
| `region`      | Region name                  |
| `address`     | Region address               |
| `total_sales` | Total sales for the region   |
| `manager`     | Regional manager information |
| `top_agents`  | Top agents for the region    |

## 7. Validation

### Agent

* `first_name` is required.
* `last_name` is required.
* `email` is required.
* `region` is required.
* `sales` defaults to `0` when omitted.
* The remaining Agent fields must follow the data types defined by the schema.

### Region

* The `region` field is required.
* The remaining Region fields must follow the data types defined by the schema.
* Region data must support the manager and top-agent information required by the application.

## 8. Expected Behavior

### Success Behavior

* A valid Agent document can be created and stored in MongoDB Atlas.
* A new Agent without a provided `sales` value receives `sales: 0`.
* A valid Region document can be created and stored in MongoDB Atlas.
* Mongoose models can be imported and used by controllers.

### Error / Invalid Behavior

* An Agent missing a required field is rejected by schema validation.
* A Region missing a required field is rejected by schema validation.
* Invalid data types are rejected when they violate the schema definitions.

### Empty / Edge Cases

* Creating an Agent without a `sales` value results in `sales: 0`.
* Optional Agent or Region fields may be omitted when the schema does not require them.

## 9. Acceptance Criteria

* [ ] `agent.schema.js` defines all eight required Agent fields:
  `first_name`, `last_name`, `email`, `region`, `rating`, `fee`, `sales`, and `manager`.

* [ ] `region.schema.js` defines all five required Region fields:
  `region`, `address`, `total_sales`, `manager`, and `top_agents`.

* [ ] Agent `sales` defaults to `0` when no sales value is provided.

* [ ] Agent required fields are enforced by the schema.

* [ ] Region required fields are enforced by the schema.

* [ ] Both schemas can be used through their corresponding Mongoose models.

* [ ] Valid Agent and Region documents can be persisted to MongoDB Atlas.
