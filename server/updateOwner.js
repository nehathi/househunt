require("dotenv").config();
const mongoose = require("mongoose");
const Property = require("./models/Property");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const result = await Property.updateMany(
      { owner: { $exists: false } },
      {
        $set: {
          owner: "6a55cdbb58bddb6d53ad5894",
        },
      }
    );

    console.log(result);

    console.log("All properties updated successfully.");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });