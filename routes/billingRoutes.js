const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requirLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", requirLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "INR",
      description: "Rs 5/- for 5 credits",
      source: req.body.id,
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
