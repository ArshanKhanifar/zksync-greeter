import * as dotenv from "dotenv";

const main = () => {
  dotenv.config();
  console.log("env var: ", process.env.PRIVATE_KEY);
};

main();
