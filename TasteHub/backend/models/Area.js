import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

export default mongoose.model("Area", areaSchema);
