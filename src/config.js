import dotenv from "dotenv";

dotenv.load();

export const MONGODB_URL = process.env.MONGODB_URL || "mongodb://ser-clevtest.clevergy.it:27017/test";
export const WI6LABS_COLLECTION_NAME = "wi6labs-raw-readings";
export const DEBUG = process.env.DEBUG;