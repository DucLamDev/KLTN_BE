import { Router } from "express";
const router = Router();

import KafkaController from '../controllers/kafkaController.js';

router.post('/create-topic', async (req, res) => {
   try {
    const {topicName, noOfPartition} = req.body;
    const kafkaControllers = new KafkaController();
    await kafkaControllers.createTopic(topicName, noOfPartition);
    res.send({
      status: "OK",
      message: "Topic Successfully created"
    })
    
   } catch (error) {
     res.status(500).send({
      message: "Failed to create Topic"
     })
   }
  
})

router.post('/publish', async (req, res) => {
  try {
     const {topicName, message} = req.body;
    const messages = [{
      key: message?.key,
      value: message?.value
    }]
     const kafkaController = new KafkaController();
     await kafkaController.publishMessageToTopic(topicName, messages);
     res.send({
      status: 'OK',
      message: "Message successfully pulished"
     })
  } catch (e) {
    console.error("Error publishing message:", e);
     res.status(500).send({
       message: "Failed to publish message to the Topic"
     });
  }
});

router.post('/consumer', async (req, res) => {
  try {
     const {topicName} = req.body;
     const kafkaController = new KafkaController();
    await kafkaController.consumerMessageFromTopic(topicName, (message) => {
        res.send({
        status: 'OK',
        message
       })
    });
  } catch (e) {
     res.status(500).send({
       message: "Failed to publish message to the Topic"
     });
  }
});
export default router;