import { FastifyInstance } from "fastify";

export const appRoutes = (app: FastifyInstance) => {
  app.get("/", (req, res) => {
    return res.send({ Hello: "word" });
  });

  app.get("/users", (req, res) => {
    res.send({ Message: "Alou rota de users" });
  });
  return app;
};
