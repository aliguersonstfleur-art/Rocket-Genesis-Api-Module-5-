# Challeng# Challenging Concepts

## 1. Mongoose References and `.populate()`

**What I learned:**
One thing I had to understand was how Mongoose references work.

In my Region schema, the `manager` and `top_agents` fields don't store the whole Agent. They store the Agent's ID instead.

Then, when I use `.populate()`, Mongoose takes those IDs and gives me the actual Agent information.

So basically, the Region points to the Agent, and `.populate()` lets me get the Agent's information when I need it.

**Where I used it:**
I used this in `src/models/region.schema.js` for the `manager` and `top_agents` fields.

I also used `.populate()` in `region.controller.js` when getting a region.

---

## 2. Making Sure Delete Only Deletes One Agent

**What I learned:**
Another thing I had to figure out was how to safely delete an agent.

For `/agent-delete`, the user can search using different pieces of information, like an email or a name.

The problem is that the search could match more than one agent.

So before deleting anything, I first check how many agents match.

If there are **zero**, I return an error.

If there is **more than one**, I also return an error and don't delete anything.

Only when there is **exactly one match** do I delete the agent.

This was important because I didn't want one request to accidentally delete multiple agents.

**Where I used it:**
I used this in `src/controllers/agent.controller.js` inside the `deleteAgent` function.

---

## 3. Middleware Order and Which Routes Need Authorization

**What I learned:**
The last thing I had to understand was middleware.

My logging middleware runs first, so it can keep track of every request that comes into the API.

Then I have my authorization middleware. This checks the access token before someone can use the protected routes.

There are three routes that don't need the token: `/hello`, `/status`, and `/error`.

The other routes do need it.

What made this a little tricky was making sure I put the middleware on the right routes. If I put it on a route that should be open, the route won't work without a token. If I forget it on a protected route, anyone could access it.

**Where I used it:**
I set up the logging middleware in `app.js`.

I added the authorization middleware to the protected routes in `agent.routes.js` and `moduleFour.routes.js`.

So the main thing I learned here was that **the order and placement of middleware matters**.
