
import { redisClient } from "../redis/redisClient.js";

// Lấy danh sách các cuộc hẹn tại queue
export const getAppointmentsFromQueue = async (queueKey) => {
  return await redisClient.lRange(queueKey, 0, -1);
};

// Xoá 1 cuộc hẹn khỏi queue
export const removeAppointmentFromQueue = async (queueKey, appointmentToRemove) => {
   return await redisClient.lRem(queueKey, 0, appointmentToRemove);
};

// Thêm chèn đầu
export const addFirstAppointmentToQueue = async (queueKey, appointmentData) => {
  return  await redisClient.lPush(queueKey, JSON.stringify(appointmentData));
}
// Thêm chèn cuối
export const addEndAppointmentToQueue = async (queueKey, appointmentData) => {
    return  await redisClient.rPush(queueKey, JSON.stringify(appointmentData));
}