if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}

//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
