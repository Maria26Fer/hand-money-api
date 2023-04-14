import { Prisma, PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { categorySchema } from "../../schemas/category";
import { uuidSchema } from "../../schemas/uuid";

const client = new PrismaClient();

const categoryController = {
  list: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const data = await client.category.findMany();
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
  insert: async (req: FastifyRequest, res: FastifyReply) => {
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

  update: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = uuidSchema.parse(req.params);
      const data = categorySchema.partial().parse(req.body);

      const category = await client.category.findUnique({
        where: {
          id,
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

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
  delete: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = uuidSchema.parse(req.params);

      const category = await client.category.findUnique({
        where: {
          id,
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

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
};

export default categoryController;
