import { Prisma, PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { uuidSchema } from "../../schemas/uuid";
import { transactionSchema } from "../../schemas/transaction";

const client = new PrismaClient();

type User = {
  wallet: {
    id: string;
  } | null;
} & Prisma.UserArgs;

const findUserById = async (id: string): Promise<User> => {
  const user = await client.user.findUnique({
    where: {
      id,
    },
    include: {
      wallet: {
        select: {
          id: true,
        },
      },
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const transactionController = {
  list: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id: userId } = uuidSchema.parse(req.params);

      const user = await findUserById(userId);

      const data = await client.transaction.findMany({
        where: {
          wallet_id: {
            equals: user?.wallet?.id,
          },
        },
      });

      res.send({ data });
    } catch (error) {
      return error;
    }
  },
  insert: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id: userId } = uuidSchema.parse(req.params);
      const data = transactionSchema.parse(req.body);

      const user = await findUserById(userId);
      if (user?.wallet?.id !== data?.wallet_id) {
        throw new Error("User not found");
      }

      const transaction = await client.transaction.create({
        data,
      });
      res.send({ transaction });
    } catch (error) {
      return error;
    }
  },
  update: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = uuidSchema.parse(req.params);
      const data = transactionSchema.partial().parse(req.body);

      const transaction = await client.transaction.update({
        data,
        where: {
          id,
        },
      });
      res.send({ transaction });
    } catch (error) {
      return error;
    }
  },
  delete: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = uuidSchema.parse(req.params);

      const transaction = await client.transaction.findUnique({
        where: {
          id,
        },
      });

      if (!transaction) {
        throw new Error("Transaction not found");
      }

      const response = await client.transaction.delete({
        where: {
          id,
        },
      });

      res.send({
        id: response?.id,
      });
    } catch (error) {
      return error;
    }
  },
};

export default transactionController;
