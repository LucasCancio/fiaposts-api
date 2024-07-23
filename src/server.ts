import { env } from "@/env";
import { app } from "@/http/app";

app.listen(
  {
    port: env.PORT,
    host: "0.0.0.0",
  },
  (error, address) => {
    if (error) {
      console.error(error);
      app.log.error(error);
      throw error;
    }
    console.log(`Server is running on ${address}`);
    app.log.info(`Server is running on ${address}`);
  }
);
