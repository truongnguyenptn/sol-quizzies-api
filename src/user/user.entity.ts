import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { ArticleEntity } from '../article/article.entity';
import {User} from '@prisma/client';

export class UserEntity implements User {

  id: string;
  username?: string;
  emailVerified: Date;
  name: string;

  email: string;

  image: string;


  password?: string;


}
