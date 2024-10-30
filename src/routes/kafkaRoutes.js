// kafkaRouter.js
import { Router } from "express";
import { createTopic, publishMessage, consumeMessages } from '../services/departmentServices.js';

const router = Router();

// Create a new topic
router.post('/create-topic', async (req, res) => {
    try {
        const { topicName, noOfPartition } = req.body;
        await createTopic(topicName, noOfPartition);
        res.send({
            status: "OK",
            message: "Topic successfully created"
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to create topic",
            error: error.message
        });
    }
});

// Publish a message to a topic
router.post('/publish', async (req, res) => {
    try {
        const { topicName, message } = req.body;
        await publishMessage(topicName, message);
        res.send({
            status: 'OK',
            message: "Message successfully published"
        });
    } catch (e) {
        console.error("Error publishing message:", e);
        res.status(500).send({
            message: "Failed to publish message to the topic",
            error: e.message
        });
    }
});

// Consume messages from a topic
router.post('/consumer', async (req, res) => {
    try {
        const { topicName } = req.body;
        await consumeMessages(topicName, (message) => {
            res.send({
                status: 'OK',
                message
            });
        });
    } catch (e) {
        res.status(500).send({
            message: "Failed to consume messages from the topic",
            error: e.message
        });
    }
});

export default router;
