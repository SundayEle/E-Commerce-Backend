const notificationModel = require("../model/notificationModel");
const userModel = require("../model/userModel");

const createANotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!userId || !type || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const notification = new notificationModel({ userId, type, message });
    await notification.save();

    if (user.notifications) {
      const userNotification = new notificationModel({
        userId: userId,
        title: notification.title,
        message: notification.message,
        type: notification.type,
      });
      await userNotification.save();

      await userModel.findByIdAndUpdate(
        userId,
        { $push: { notifications: userNotification._id } },
        { new: true }
      );
    }

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

const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await notificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Notification marked as read!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

module.exports = { createANotification, markNotificationAsRead };
