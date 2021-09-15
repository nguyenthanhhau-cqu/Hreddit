import { } from "@mikro-orm/cli"
import {MikroORM} from "@mikro-orm/core"
import {} from "@mikro-orm/migrations"
import {__prod__} from './constant'
import { Post } from "./entities/Post"
import mikroOrmConfig from "./mikro-orm.config"

const main = async () =>{ 
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();
    const post = orm.em.create(Post,{title:"This is my first post"});
    await orm.em.persistAndFlush(post);
}
main().catch((error)=> {
    console.error(error);
});
console.log("Hello World");