import debug from "debug";
import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();
const logger = debug('node-kafka:KafkaController')

 class KafkaController {
  constructor() {
    this.Kafka = new Kafka ({
      clientId: process.env.CLIENT_ID,
      brokers:  [process.env.BROKER_1],
      // createPartitioner: Partitioners.LegacyPartitioner
    })

  }
  async createTopic(topicName, noOfPartition){
    try{
       const admin = this.Kafka.admin();
       await admin.connect();
       await admin.createTopics({
         topics:[{
           topic: topicName.toString(),
           numPartitions: parseInt(noOfPartition),
           replicationFactor: 1

         }]
       });
       await admin.disconnect();
    } catch (e) {
       logger(e);
       throw e;
    }
  }

  async publishMessageToTopic(topicName, messages) {
    const producer = this.Kafka.producer();
    try {
      await producer.connect();
      await producer.send({
        topic: topicName,
        messages
      })
    } catch (e) {
      logger(e);
      throw e;
    }finally {
      await producer.disconnect();
    }
  }

  async consumerMessageFromTopic(topicName, callback) {
    const consumer = this.Kafka.consumer({groupId: 'test-group'});
    try {
      await consumer.connect();
      await consumer.subscribe({
        topic: topicName,
        fromBeginning: true
      });
      await consumer.run({
        eachMessage: async ({
          topic,
          partition,
          message
        }) => {
          const value = `Received message: ${message.value.toString()} from partition ${partition} & topic ${topic}`;
          callback(value);
        }
      })
    } catch (e) {
      logger(e);
      throw e;    
    }
  }
}

export default KafkaController;