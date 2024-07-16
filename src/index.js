import envConfig from "./config/envConfig.js";
import connectDB from "./config/db.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(envConfig.port, () => {
      console.log(`Server running at port: ${envConfig.port}`);
    });
  })
  .catch((err) => console.log("MongoDB connection failed!!", err));
