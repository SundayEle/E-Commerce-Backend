const notificationModel = require("../model/notificationModel");

const createANotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;

    if (!userId || !type || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const notification = new notificationModel({ userId, type, message });
    await notification.save();

    return res.status(201).json({
      message: "Notification created!",
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

module.exports = createANotification;
