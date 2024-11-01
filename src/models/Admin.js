import mongoose from 'mongoose';

import bcrypt from 'bcryptjs';


const AdminSchema = new mongoose.Schema({
    _id: { type: String, auto: false },
    fullName: { type: String, required: true },
    role: { type: String, default: 'admin' },
    phone: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

AdminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('Admin', AdminSchema);
