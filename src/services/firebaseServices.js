import admin from "../util/firebase.js";
import { findByRole } from "../repositories/userRepository.js";
export const sendNotificationToRole = async (role, title, body) => {
  const users = await findByRole(role);
  const tokens = users.map((user) => user.fcmToken).filter((token) => token);

  if (tokens.length > 0) {
    const message = {
      notification: { title, body },
      tokens: tokens,
    };

    try {
      await admin.messaging().sendMulticast(message);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }
};
