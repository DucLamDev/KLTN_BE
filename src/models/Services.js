import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});


const Services= mongoose.model('Services', serviceSchema);
export default Services;
    