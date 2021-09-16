import { Entity, PrimaryKey, Property } from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
    @Field()
    @PrimaryKey()
    id!: number; // string is also supported 

    @Field(() => String)
    @Property({ type: "date" })
    createdAt: Date = new Date();

    @Field(() => String)
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @Field()
    @Property({ unique: true })
    userName!: string;

    @Property()
    passWord!: string;


}