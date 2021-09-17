import { Connection, IDatabaseDriver, EntityManager } from "@mikro-orm/core";
import { Request, Response } from "express";
import { Redis } from "ioredis";

export type MyConText = {
    em: EntityManager<IDatabaseDriver<Connection>>;
    req: Request;
    res: Response;
}