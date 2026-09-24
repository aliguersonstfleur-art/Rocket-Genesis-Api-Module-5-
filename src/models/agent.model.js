import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    region: { type: String, required: true },
    rating: { type: Number, default: 0 },
    fee: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    manager: { type: Boolean, default: false },
});

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
