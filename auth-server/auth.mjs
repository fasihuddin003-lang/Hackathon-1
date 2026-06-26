import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("./auth.db"),
  baseURL: "http://localhost:4000",
  secret: process.env.BETTER_AUTH_SECRET || "ktFD5GazIBdENLKxuQncgrpSR1hVvPZO8YUTs23qj9b6efC7mH0W4wXilAyJoM",
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      softwareExp: {
        type: "string",
        required: false,
      },
      hardwareExp: {
        type: "string",
        required: false,
      },
      roboticsExp: {
        type: "string",
        required: false,
      },
    },
  },
});
