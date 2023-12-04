const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://kostiantynss:ckCF8y913rvNXxc2@cluster0.vkapukh.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(4000, () => {
      console.log("Server running. Use our API on port: 4000");
    })
  )
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
