/* *******************
 * MODEL IMPORT
 *********************/
import Agent from '../models/agent.model.js';

/* ***************
 * ROUTE HANDLERS
 *****************/

/*
 * POST - /agent-create
 * Creates a new agent. Required: first_name, last_name, email, region.
 */
const createAgent = async (req, res) => {
    try {
        const { first_name, last_name, email, region } = req.body;

        if (!first_name || !last_name || !email || !region) {
            return res.status(400).json({
                success: false,
                message: 'first_name, last_name, email, and region are required',
            });
        }

        const newAgent = await Agent.create({ first_name, last_name, email, region });

        res.status(201).json({
            success: true,
            message: 'Agent created successfully',
            data: newAgent,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create agent',
            error: error.message,
        });
    }
};

/*
 * GET - /agents
 * Returns all agents, sorted alphabetically by last_name.
 */
const getAllAgents = async (_req, res) => {
    try {
        const agents = await Agent.find().sort({ last_name: 1 });

        res.status(200).json({
            success: true,
            data: agents,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve agents',
            error: error.message,
        });
    }
};

/*
 * GET - /agents-by-region
 * Returns agents matching the given region query param, sorted by rating.
 */
const getAgentsByRegion = async (req, res) => {
    try {
        const { region } = req.query;

        if (!region) {
            return res.status(400).json({
                success: false,
                message: 'region query parameter is required',
            });
        }

        const agents = await Agent.find({ region }).sort({ rating: -1 });

        res.status(200).json({
            success: true,
            data: agents,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve agents by region',
            error: error.message,
        });
    }
};

/*
 * PUT/PATCH - /agent-update-info
 * Updates first_name, last_name, email, and/or region for an existing agent.
 * Assumes the request includes the agent's _id to identify which agent to update.
 */
const updateAgentInfo = async (req, res) => {
    try {
        const { _id, first_name, last_name, email, region } = req.body;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: '_id is required to identify the agent to update',
            });
        }

        const updates = {};
        if (first_name) updates.first_name = first_name;
        if (last_name) updates.last_name = last_name;
        if (email) updates.email = email;
        if (region) updates.region = region;

        const updatedAgent = await Agent.findByIdAndUpdate(_id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedAgent) {
            return res.status(404).json({
                success: false,
                message: 'Agent not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Agent updated successfully',
            data: updatedAgent,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update agent',
            error: error.message,
        });
    }
};

// ... add more route handlers here as you build them

/*
 * DELETE - /agent-delete
 * Deletes an agent matched by any provided query parameters.
 * Only deletes when the query matches exactly one agent.
 */
const deleteAgent = async (req, res) => {
    try {
        const filter = req.query;

        if (Object.keys(filter).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'At least one query parameter is required to identify the agent to delete',
            });
        }

        const matches = await Agent.find(filter);

        if (matches.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No agent matches the given parameters',
            });
        }

        if (matches.length > 1) {
            return res.status(400).json({
                success: false,
                message: `${matches.length} agents matched the given parameters; refine your query to match exactly one agent`,
            });
        }

        await Agent.deleteOne({ _id: matches[0]._id });

        res.status(200).json({
            success: true,
            message: 'Agent deleted successfully',
            data: matches[0],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete agent',
            error: error.message,
        });
    }
};

/* *******
 * EXPORTS
 *********/
export default {
    createAgent,
    getAllAgents,
    getAgentsByRegion,
    updateAgentInfo,
    deleteAgent,
};
