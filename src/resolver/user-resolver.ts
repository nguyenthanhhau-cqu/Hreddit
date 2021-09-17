import { MyConText } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import * as argon2 from "argon2";



@ObjectType()
export class ErrorType {
    @Field()
    fieldName: string
    @Field()
    errorMessage: string
}


@ObjectType()
export class UserRespond {

    @Field(() => [ErrorType], { nullable: true })
    errors?: ErrorType[]

    @Field(() => User, { nullable: true })
    user?: User
}

@InputType()
export class UserInput {
    @Field()
    userName: string
    @Field()
    passWord: string
}


@Resolver()
export class UserResolver {

    @Query(() => User, { nullable: true })
    async me(
        @Ctx() { em, req }: MyConText
    ) {
        if (!req.session.userId) {
            return null
        }
        const user = await em.findOne(User, { id: req.session.userId })
        return user;
    }

    @Mutation(() => UserRespond)
    async register(
        @Arg("options") options: UserInput,
        @Ctx() ctx: MyConText
    ): Promise<UserRespond> {
        if (options.userName.length <= 2) {
            return {
                errors: [{
                    fieldName: "username",
                    errorMessage: "Your user name must greater then 2 character"
                }]
            }
        }
        if (options.passWord.length <= 3) {
            return {
                errors: [{
                    fieldName: "password",
                    errorMessage: "Your password must greater then 3 character"
                }]
            }
        }
        const hashPassWord = await argon2.hash(options.passWord)
        const user = ctx.em.create(User, { userName: options.userName, passWord: hashPassWord })
        try {
            await ctx.em.persistAndFlush(user)
        } catch (err) {
            if (err.code == "23505") {// error for unique constraint
                return {
                    errors: [{
                        fieldName: "user name",
                        errorMessage: "The user name already taken"
                    }]
                };
            }
        }
        return { user }
    }
    @Mutation(() => UserRespond)
    async login(
        @Arg("options") options: UserInput,
        @Ctx() { req, res, em }: MyConText
    ): Promise<UserRespond> {
        const user = await em.findOne(User, { userName: options.userName })
        if (!user) {
            return {
                errors: [
                    {
                        fieldName: "username",
                        errorMessage: "your user name doest exist or invalid"
                    }
                ]
            }
        }
        const unHashPassWord = await argon2.verify(user.passWord, options.passWord)
        if (!unHashPassWord) {
            return {
                errors: [
                    {
                        fieldName: "password",
                        errorMessage: "your password is not correct"
                    }
                ]
            }
        }

        req.session.userId = user.id

        console.log(req.session.userId)


        return { user }
    }
}