import { FastifyInstance } from "fastify";
import userController from "../controllers/user";
import cardController from "../controllers/card";
import categoryController from "../controllers/category";
import transactionController from "../controllers/transaction";

export const appRoutes = async (app: FastifyInstance) => {
  app.get("/users", userController.list);

  app.post("/users", userController.insert);

  app.patch("/users/:id", userController.update);

  app.delete("/users/:id", userController.delete);

  app.get("/user/cards/:id", cardController.list);

  app.post("/user/cards", cardController.insert);

  app.patch("/user/cards/:id", cardController.update);

  app.delete("/user/cards/:id", cardController.delete);

  app.get("/category", categoryController.list);

  app.post("/category", categoryController.insert);

  app.patch("/category/:id", categoryController.update);

  app.delete("/category/:id", categoryController.delete);

  app.get("/user/wallet/transactions/:id", transactionController.list);

  app.post("/user/wallet/transaction/:id", transactionController.insert);

  app.patch("/user/wallet/transaction/:id", transactionController.update);

  app.delete("/user/wallet/transaction/:id", transactionController.delete);

  return app;
};
