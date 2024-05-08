import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "HospitalManagementSystem" })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((error) => {
      console.log(
        `Some error occured while connecting to the database ${error}`
      );
    });
};
