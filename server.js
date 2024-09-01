import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://DucLam:kr7i8EBTmZqwuiRX@clinic-management.hmcis.mongodb.net/?retryWrites=true&w=majority&appName=clinic-management", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
