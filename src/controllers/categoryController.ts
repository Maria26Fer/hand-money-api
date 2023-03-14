import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { categorySchema } from "../schemas/category";
import { uuidSchema } from "../schemas/uuid";

const client = new PrismaClient();

export default {
  getCategories: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const data = await client.category.findMany();
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
  insertCategory: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const data = categorySchema.parse(req.body);

      const response = await client.category.create({
        data,
      });

      res.send(response);
    } catch (error) {
      res.send(error);
    }
  },
  deleteCategory: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = uuidSchema.parse(req.params);

      const response = await client.category.delete({
        where: {
          id,
        },
      });

      res.send(response);
    } catch (error) {
      res.send(error);
    }
  },
  updateCategory: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = uuidSchema.parse(req.params);

      const data = categorySchema.partial().parse(req.body);

      const response = await client.category.update({
        where: {
          id,
        },
        data,
      });

      res.send(response);
    } catch (error) {
      res.send(error);
    }
  },
};
