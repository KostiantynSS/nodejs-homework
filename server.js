const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_HOST)
  .then(() =>
    app.listen(4000, () => {
      console.log("Server running. Use our API on port: 4000");
    })
  )
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
