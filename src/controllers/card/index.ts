import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { uuidSchema } from "../../schemas/uuid";
import { cardSchema } from "../../schemas/card";
import {z} from "zod";

const client = new PrismaClient();

const cardController = {
  list: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id: userId } = uuidSchema.parse(req.params);

      if (!userId) {
        return [];
      }

      const data = await client.card.findMany({
        where: {
          user_id: {
            equals: userId,
          },
        },
      });

      res.send(data);
    } catch (e) {
      return e;
    }
  },
  insert: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const data = cardSchema.parse(req.body);

      const { id } = await client.card.create({
        data,
      });
      return res.send({ id });
    } catch (error) {
      return error;
    }
  },
  update: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = uuidSchema.parse(req.params);
      const data = cardSchema.partial().parse(req.body);
      
      const card = await client.card.findUnique({
        where: {
          id,
        },
      });

      

      if (!card || !data) {
        throw new Error("Unidentified card");
      }

      const response = await client.card.update({
        data,
        where: {
          id,
        },
      });
      res.send(response);
    } catch (error) {
      return error;
    }
  },
  delete: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = uuidSchema.parse(req.params);

      const card = await client.card.findUnique({
        where: {
          id,
        },
      });

      if (!card) {
        throw new Error("Unidentified card");
      }

      const response = await client.card.delete({
        where: {
          id,
        },
      });

      res.send({
        id: response?.id,
      });
    } catch (error) {
      return error
    }
  },
};

export default cardController;
