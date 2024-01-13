import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsService } from './questions/questions.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { StatisticsModule } from './statistics/statistics.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    PrismaModule,
    StatisticsModule,
    GamesModule
  ],
  controllers: [
    AppController,
    QuestionsController
  ],
  providers: [QuestionsService, PrismaService, UserService]
})
export class ApplicationModule {
  constructor() {}
}
