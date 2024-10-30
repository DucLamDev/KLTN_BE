// kafkaService.js
import KafkaController from '../controllers/kafkaController.js';

const kafkaController = new KafkaController();

// Create a new Kafka topic
export const createTopic = async (topicName, noOfPartition) => {
    await kafkaController.createTopic(topicName, noOfPartition);
};

// Publish a message to a Kafka topic
export const publishMessage = async (topicName, message) => {
    const messages = [{ key: message?.key, value: message?.value }];
    await kafkaController.publishMessageToTopic(topicName, messages);
};

// Consume messages from a Kafka topic
export const consumeMessages = async (topicName, messageHandler) => {
    await kafkaController.consumerMessageFromTopic(topicName, messageHandler);
};
