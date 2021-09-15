import { Connection, IDatabaseDriver,EntityManager } from "@mikro-orm/core";

export type MyConText = {
    em:EntityManager<IDatabaseDriver<Connection>>
}