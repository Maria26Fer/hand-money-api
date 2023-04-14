import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { profileSchema } from "../../schemas/profile";
import { uuidSchema } from "../../schemas/uuid";

const client = new PrismaClient();

const userController = {
  list: async (_: FastifyRequest, res: FastifyReply) => {
    const data = await client.user.findMany({
      include: {
        profile: true,
        wallet:{
          select:{
            id: true,
          }
        }
      },
    });

    res.send(data).status;
  },
  insert: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const profile = profileSchema.parse(req.body);

      const findUser = await client.user.findFirst({
        where: {
          profile: {
            email: {
              equals: profile.email,
            },
          },
        },
      });

      if (findUser) {
        throw new Error("Invalid e-mail");
      }

      const response = await client.user.create({
        data: {
          profile: {
            create: profile,
          },
          wallet: {
            create: {},
          },
        },
      });

      return res.send(response);
    } catch (error) {
      return error;
    }
  },
  update: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = uuidSchema.parse(req.params);

      const data = profileSchema.partial().parse(req.body);

      const findUser = await client.user.findFirst({
        where: {
          profile: {
            email: {
              equals: data.email,
            },
          },
        },
      });

      if (findUser) {
        throw new Error("Invalid e-mail");
      }

      const updatedData = await client.user.update({
        where: {
          id,
        },
        select: {
          id: true,
          created_at: true,
          updated_at: true,
          profile: true,
        },
        data: {
          profile: {
            update: data,
          },
        },
      });

      return res.send(updatedData);
    } catch (error) {
      return error;
    }
  },
  delete: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = uuidSchema.parse(req.params);
      await client.user.delete({
        where: {
          id,
        },
      });
      return res.send({ id });
    } catch (error) {
      return error;
    }
  },
};

export default userController;
