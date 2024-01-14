import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionsService } from 'src/questions/questions.service';

@Module({
  controllers: [GamesController],
  providers: [GamesService, PrismaService, QuestionsService],
})
export class GamesModule {}
