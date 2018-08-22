const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
module.exports = async (req, res) => {
  const data = await Survey.remove({ _id: req.body._id });
  const surveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false
  });
  res.send(surveys);
};
