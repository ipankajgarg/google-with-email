const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url"); //no need to install ....inbuilt
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer.js");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const fetchData = require("../helper/fetchData");
const Survey = mongoose.model("surveys");

module.exports = app => {
  app.patch("/api/surveys/", async (req, res) => {
    console.log(req.body);
    const data = await Survey.remove({ _id: req.body._id });
    fetchData(req, res);
  });
  app.get("/api/surveys", requireLogin, async (req, res) => {
    fetchData(req, res);
  });
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("thanks for your vote");
  });
  app.post("/api/surveys/webhooks", (req, res) => {
    console.log(req.body);
    // const events = _.map(req.body, ({ url, email }) => {
    //   const pathname = new URL(url).pathname;
    //   const p = new Path("/api/surveys/:surveyId/:choice");
    //   const match = p.test(pathname);
    //   if (match) {
    //     return { email, surveyId: match.surveyId, choice: match.choice };
    //   }
    // });
    // console.log(events);
    // const compactEvents = _.compact(events); //remove undefined record
    // const uniqueEvents = _.uniqBy(compactEvents,'email','surveyId')
    _.chain(req.body)
      .map(({ url, email }) => {
        const pathname = new URL(url).pathname;
        const p = new Path("/api/surveys/:surveyId/:choice");
        const match = p.test(pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact() //remove undefined record
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();
    res.send({});
  });
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, body, subject, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    console.log("hello", survey);

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
