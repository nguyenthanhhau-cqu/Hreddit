import {MikroORM} from "@mikro-orm/core"
import {__prod__} from './constant'
import { Post } from "./entities/Post"
import mikroOrmConfig from "./mikro-orm.config"
import express from 'express'
import {ApolloServer} from "apollo-server-express"
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolver/hello"

const main = async () =>{ 

    const app  = express();
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver],
            validate: false

        }),
        context: () => ({
            em: orm.em
        }),
       
    })
    await server.start()
    server.applyMiddleware({app});
    app.listen(4000,()=> {
        console.log("this server is running")
    })

}
main().catch((error)=> {
    console.error(error);
});
