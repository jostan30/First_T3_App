import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import prisma from "lib/prisma";

export const userRouter = createTRPCRouter ({

    createUser : publicProcedure
    .input(z.object({name:z.string().min(4) ,email :z.string().email()}))
    .mutation(async({input})=>{
        return await prisma.user.create({
            data:{
                name:input.name,
                email:input.email
            }
        })
    }),

    getallUsers : publicProcedure
    .query(async ()=>{
        return await prisma.user.findMany();
    })

});