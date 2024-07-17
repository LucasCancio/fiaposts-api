import { env } from "@/env";
import { app } from "@/http/app";

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("Server is running on port http://localhost:" + env.PORT);
  });
