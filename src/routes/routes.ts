import { FastifyInstance } from "fastify";
import categoryController from "../controllers/categoryController";
import userController from "../controllers/userController";

export const appRoutes = async (app: FastifyInstance) => {

  app.get("/", (_, res) => res.send({ Hello: "word" }));

  app.get("/users", userController.getUsers);

  app.post("/users", userController.insertUser);

  app.delete("/users/:id", userController.deleteUser);

  app.patch("/users/:id", userController.updateUser);

  app.get("/category", categoryController.getCategories);

  app.post("/category", categoryController.insertCategory);

  app.delete("/category/:id", categoryController.deleteCategory);

  app.patch("/category/:id", categoryController.updateCategory);

  return app;
};
