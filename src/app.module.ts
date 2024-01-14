import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { QuestionsModule } from './questions/questions.module';
import { PrismaModule } from './prisma/prisma.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [PrismaModule, StatisticsModule, GamesModule, QuestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
