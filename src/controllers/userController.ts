import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { profileSchema } from "../schemas/profile";
import { uuidSchema } from "../schemas/uuid";


const client = new PrismaClient();

export default {
  getUsers: async (_: FastifyRequest, res: FastifyReply) => {
    const data = await client.user.findMany({
      include: {
        profile: true,
      },
    });

    res.send(data).status;
  },
  insertUser: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      
      const profile = profileSchema.parse(req.body);
      const response = await client.user.create({
        data: {
          profile: {
            create: profile,
          },
          wallet:{
            create: {}
          }
        },
      });

      return res.send(response);
    } catch (error) {
      return res.status(400).send({ error })
    }
  },
  deleteUser: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = uuidSchema.parse(req.params);
      await client.user.delete({
        where:{
          id
        }
      })
      return res.send({ id })
    } catch (error) {
      res.status(404).send({ error })
    }
  },
  updateUser: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = uuidSchema.parse(req.params)

      const data = profileSchema.partial().parse(req.body);

      const updatedData = await client.user.update({
        where:{
          id
        },
        select:{
          id: true,
          created_at: true,
          updated_at: true,
          profile: true
        },
        data:{
          profile: {
            update: data
          }
        }
      })

      return res.send(updatedData)
    } catch (error) {
      res.send(error)
    }
  }
};
