import Agent from '../models/agent.schema.js';
import Region from '../models/region.schema.js';

const createRegion = async (req, res) => {
    try {
        const { region } = req.body;

        if (!region) {
            return res.status(400).json({
                success: false,
                message: 'region is required',
            });
        }

        const existingRegion = await Region.findOne({ region });

        if (existingRegion) {
            return res.status(400).json({
                success: false,
                message: 'Region already exists',
            });
        }

        const manager = await Agent.create({
            first_name: `${region} Manager`,
            last_name: 'Manager',
            email: `${region.toLowerCase()}-manager@rocket.elv`,
            region,
            manager: true,
        });

        const agents = await Agent.find({ region }).sort({ sales: -1 });
        const totalSales = agents.reduce((sum, agent) => sum + agent.sales, 0);
        const topAgents = agents.slice(0, 3).map((agent) => agent._id);

        const newRegion = await Region.create({
            region,
            total_sales: totalSales,
            manager: manager._id,
            top_agents: topAgents,
        });

        res.status(201).json({
            success: true,
            message: 'Region created successfully',
            data: newRegion,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create region',
            error: error.message,
        });
    }
};

const getRegion = async (req, res) => {
    try {
        const { region } = req.query;

        if (!region) {
            return res.status(400).json({
                success: false,
                message: 'region query parameter is required',
            });
        }

        const foundRegion = await Region.findOne({ region })
            .populate('manager')
            .populate('top_agents');

        if (!foundRegion) {
            return res.status(404).json({
                success: false,
                message: 'Region not found',
            });
        }

        res.status(200).json({
            success: true,
            data: foundRegion,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve region',
            error: error.message,
        });
    }
};

const getAllStars = async (_req, res) => {
    try {
        const regions = await Region.find().select('region');
        const allStars = await Promise.all(
            regions.map((region) => Agent.findOne({ region: region.region }).sort({ sales: -1 }))
        );

        res.status(200).json({
            success: true,
            data: allStars.filter(Boolean),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve all-star agents',
            error: error.message,
        });
    }
};

export default {
    createRegion,
    getRegion,
    getAllStars,
};
