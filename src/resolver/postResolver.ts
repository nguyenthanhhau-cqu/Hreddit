import { Post } from "../entities/Post";
import { MyConText } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(
        @Ctx() ctx: MyConText
    ): Promise<Post[]> {
        return ctx.em.find(Post, {})
    }

    @Query(() => Post, { nullable: true })
    async post(
        @Arg('id', () => Int) id: number,
        @Ctx() ctx: MyConText
    ): Promise<Post | null> {
        return await ctx.em.findOne(Post, { id })
    }


    @Mutation(() => Boolean, { nullable: true })
    async deletePost(
        @Arg('id') id: number,
        @Ctx() ctx: MyConText
    ): Promise<boolean | null> {
        await ctx.em.nativeDelete(Post, { id });
        return true;
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg('id') id: number,
        @Arg('title', () => String, { nullable: true }) title: string,
        @Ctx() ctx: MyConText
    ): Promise<Post | null> {
        const post = await ctx.em.findOne(Post, { id });
        if (!post) {
            return null
        }
        if (typeof title !== "undefined") {
            post.title = title;
            await ctx.em.persistAndFlush(post);
        }
        return post
    }
    @Mutation(() => Post, { nullable: true })
    async createPost(
        @Arg('title', () => String, { nullable: true }) title: string,
        @Ctx() ctx: MyConText
    ): Promise<Post> {
        const post = ctx.em.create(Post, { title: title })
        await ctx.em.persistAndFlush(post)
        return post;
    }
}