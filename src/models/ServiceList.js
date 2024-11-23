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

const serviceListSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        ref: 'Doctor',
        required: true
    },
    patientId: {
        type: String,
        ref: 'Patient',
        required: true
    },
    services: [serviceSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ServiceList = mongoose.model('ServiceList', serviceListSchema);
export default ServiceList;
