import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes/routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes)

app
  .listen({ port: 3366 })
  .then(() => console.log("Server running in http://localhost:3366"));
