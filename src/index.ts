import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from './constant'
// import { Post } from "./entities/Post"
import mikroOrmConfig from "./mikro-orm.config"
import express from 'express'
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolver/postResolver"
import { UserResolver } from "./resolver/user-resolver"
import cors from "cors"
import redis from 'redis'
import connectRedis from "connect-redis"
import Session from 'express-session'




const main = async () => {

    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();
    const app = express()
    let RedisStore = connectRedis(Session)
    let redisClient = redis.createClient()
    app.set("trust proxy", 1);


    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }))

    app.use(
        Session({
            name: "qid",
            store: new RedisStore({ client: redisClient, disableTouch: false, }),
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
                httpOnly: true,
                secure: !__prod__,
                sameSite: 'lax', //csrf
            },
            secret: 'asdfasdfasdfasdfasdfasdfasdf',
            resave: false,
        }),




    )

    const server = new ApolloServer({

        schema: await buildSchema({
            resolvers: [PostResolver, UserResolver],
            validate: false

        }),
        context: ({ req, res }): any => ({ //context can be accessible by any Resolver
            em: orm.em,
            req,
            res
        }),

    })


    await server.start()
    server.applyMiddleware({ app, cors: false });


    app.listen(4000, () => {
        console.log("this server is running")
    })

}
main().catch((error) => {
    console.error(error);
});
