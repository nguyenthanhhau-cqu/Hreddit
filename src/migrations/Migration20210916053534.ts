import { Migration } from '@mikro-orm/migrations';

export class Migration20210916053534 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_name" varchar(255) not null, "pass_word" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_user_name_unique" unique ("user_name");');
  }

}
