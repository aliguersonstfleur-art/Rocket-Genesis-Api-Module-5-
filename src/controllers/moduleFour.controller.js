import Agent from '../models/agent.schema.js';
import Contact from '../models/contact.schema.js';
import { UNIT_PRICES, INSTALL_PERCENT_FEES } from '../shared/resources/data.js';

/*
 * GET - /status
 * Public. Returns basic server status information.
 */
const status = async (_req, res) => {
    res.status(200).json({
        success: true,
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
};

/*
 * GET - /error
 * Public. Deliberately triggers a handled error to demonstrate error handling.
 */
const error = async (_req, res) => {
    try {
        throw new Error('This is a deliberate test error');
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Handled test error',
            error: err.message,
        });
    }
};

/*
 * GET - /email-list
 * Protected. Reads the Agents list from MongoDB and returns their emails.
 */
const emailList = async (_req, res) => {
    try {
        const agents = await Agent.find().select('email -_id');
        res.status(200).json({
            success: true,
            data: agents.map((agent) => agent.email),
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve email list',
            error: err.message,
        });
    }
};

/*
 * GET - /region-avg
 * Protected. Returns average rating and fee for agents in a region, from MongoDB.
 */
const regionAvg = async (req, res) => {
    try {
        const { region } = req.query;

        if (!region) {
            return res.status(400).json({
                success: false,
                message: 'region query parameter is required',
            });
        }

        const agents = await Agent.find({ region });

        if (agents.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No agents found for this region',
            });
        }

        const avgRating = agents.reduce((sum, agent) => sum + agent.rating, 0) / agents.length;
        const avgFee = agents.reduce((sum, agent) => sum + agent.fee, 0) / agents.length;

        res.status(200).json({
            success: true,
            data: {
                region,
                averageRating: avgRating,
                averageFee: avgFee,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to calculate region averages',
            error: err.message,
        });
    }
};

/*
 * POST - /calc-residential
 * Protected. Calculates a residential elevator quote from the pricing resource file.
 */
const calcResidential = async (req, res) => {
    try {
        const { tier, units } = req.body;

        if (!tier || !UNIT_PRICES[tier]) {
            return res.status(400).json({
                success: false,
                message: `tier must be one of: ${Object.keys(UNIT_PRICES).join(', ')}`,
            });
        }

        if (!units || units <= 0) {
            return res.status(400).json({
                success: false,
                message: 'units must be a positive number',
            });
        }

        const unitCost = UNIT_PRICES[tier] * units;
        const installFee = unitCost * INSTALL_PERCENT_FEES[tier];
        const total = unitCost + installFee;

        res.status(200).json({
            success: true,
            data: {
                tier,
                units,
                unitCost,
                installFee,
                total,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to calculate residential quote',
            error: err.message,
        });
    }
};

/*
 * POST - /contact-us
 * Protected. Saves a contact submission to MongoDB.
 */
const contactUs = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'name, email, and message are required',
            });
        }

        const newContact = await Contact.create({ name, email, message });

        res.status(201).json({
            success: true,
            message: 'Contact message received',
            data: newContact,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to save contact message',
            error: err.message,
        });
    }
};

export default {
    status,
    error,
    emailList,
    regionAvg,
    calcResidential,
    contactUs,
};
