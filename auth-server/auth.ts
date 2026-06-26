import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("./auth.db"),
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
