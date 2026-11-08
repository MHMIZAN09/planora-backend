import { Injectable } from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { NewUser, User, users } from './db/schema/users.schema.js';


@Injectable()
export class AppService {
  constructor(
    @InjectDrizzle() private readonly db: NodePgDatabase
  ) {}

  findAll():Promise<User[]> {
    return this.db.select().from(users)
  }

  getHello(): string {
    return 'Hello World!';
  }

  async create(user: NewUser): Promise<User> {
    const [createdUser] = await this.db.insert(users).values(user).returning();
    return createdUser;
  }
}
