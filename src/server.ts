import { env } from "@/env";
import { app } from "@/http/app";

app.listen(
  {
    port: env.PORT,
  },
  (error, address) => {
    if (error) {
      app.log.error(error);
      throw error;
    }
    app.log.info(`Server is running on ${address}`);
  }
);
