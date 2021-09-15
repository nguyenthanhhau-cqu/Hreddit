import {Entity, PrimaryKey, Property} from "@mikro-orm/core"

@Entity()
export class Post {

  @PrimaryKey()
  id!: number; // string is also supported

  @Property({type:'text'})
  title!: string;

  @Property({type: "date"})
  createdAt: Date = new Date();

  @Property({type:"date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}