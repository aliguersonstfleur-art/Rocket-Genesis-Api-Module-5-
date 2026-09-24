import mongoose from "mongoose";

const regionSchema = new mongoose.Schema({
    region: { type: String, required: true, unique: true },
    total_sales: { type: Number, default: 0 },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
    top_agents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Agent" }],
});

const Region = mongoose.model("Region", regionSchema);

export default Region;
