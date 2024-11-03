
import { redisClient } from "../redis/redisClient.js";

// Lấy danh sách các cuộc hẹn tại queue
export const getAppointmentsFromQueue = async (queueKey) => {
  return await redisClient.lRange(queueKey, 0, -1);
};

// Xoá 1 cuộc hẹn khỏi queue
export const removeAppointmentFromQueue = async (queueKey, appointmentToRemove) => {
  if (!appointmentToRemove) {
      throw new Error("appointmentToRemove is undefined or null");
  }

  // Chuyển đổi appointmentToRemove thành chuỗi JSON nếu nó là một đối tượng
  const appointmentString = typeof appointmentToRemove === 'string'
      ? appointmentToRemove
      : JSON.stringify(appointmentToRemove);

  // Log cho biết dữ liệu trước khi xóa
  console.log("Attempting to remove:", appointmentString); // Kiểm tra chuỗi trước khi xóa

  try {
      // Sử dụng chuỗi thay vì Buffer
      const result = await redisClient.lRem(queueKey, 0, appointmentString);
      console.log("Number of removed items:", result);
      return result;
  } catch (error) {
      console.error("Error in lRem:", error);
      throw error;
  }
};


// Thêm chèn đầu
export const addFirstAppointmentToQueue = async (queueKey, appointmentData) => {
  return  await redisClient.lPush(queueKey, JSON.stringify(appointmentData));
}
// Thêm chèn cuối
export const addEndAppointmentToQueue = async (queueKey, appointmentData) => {
    return  await redisClient.rPush(queueKey, JSON.stringify(appointmentData));
}