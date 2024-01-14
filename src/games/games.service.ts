import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from '../prisma/prisma.service';
import { StartGameDto } from './dto/start-game.dto';
import { SubmitgameDto } from './dto/submit-game.dto';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
  }

  findAll() {
    return `This action returns all games`;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
  async startGame(startgameDto: StartGameDto) {
    const { gameId, userId } = startgameDto;
    const attemptCount = await this.prisma.attempt.count({
      where: {
        gameId: gameId,
        userId: userId,
      },
    });

    const attempt = await this.prisma.attempt.create({
      data: {
        gameId: gameId,
        userId: userId,
        id: Math.random().toString(36).substr(2, 9),
        attemptCount: attemptCount + 1,
      },
    });
    return attempt;
  }

  async gameStatistics(gameId: string, userId: string) {
    console.log({ gameId }, { userId });
    const attemptCount = await this.prisma.attempt.count({
      where: {
        gameId: gameId,
        userId: userId,
      },
    });
    const lastAttempt = await this.prisma.attempt.findFirst({
      where: {
        gameId: gameId,
        userId: userId,
        attemptCount: attemptCount,
      },
    });
    console.log({ lastAttempt }, { attemptCount });
    // Find questions for the given game and user
    const questions = await this.prisma.question.findMany({
      where: {
        gameId: gameId,
      },
      select: {
        id: true,
        question: true,
        options: true,
      },
    });
    console.log({questions})
    // Initialize result object
    let result = {
      accuracy: lastAttempt?.percentageCorrect || 0,
      questions: [],
      // time: {
      //   start: lastAttempt?. || 0,
      //   end: lastAttempt?.updatedAt || 1,
      // }
    };

    // Loop through each question to gather answers and accuracy
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
    console.log({question})

      // Find the answer for the current question
      const answer = await this.prisma.answer.findFirst({
        where: {
          attemptId: lastAttempt?.id,
          questionId: question.id,
        },
      });
      console.log({ answer });
      // Add question details and answer to the result
      result.questions.push({
        question: question.question,
        options: question.options,
        userAnswer: answer?.userAnswer,
        isCorrect: answer?.isCorrect,
      });
    }
    return result;

  }
  async submitGame(submitGameDto: SubmitgameDto) {
    const { gameId, userId, attemptId } = submitGameDto;
    console.log({ gameId }, { userId }, { attemptId });
    let accuracy: number = 0;
    const questions = await this.prisma.question.findMany({
      where: {
        gameId: gameId,
      },
      select: {
        id: true,
        question: true,
        options: true,
      },
    });
    console.log({ questions });

    let totalCorrect = 0;
    // Loop through each question to gather answers and accuracy
    for (let i = 0; i < questions?.length; i++) {
      const question = questions?.[i];

      // Find the answer for the current question
      const answer = await this.prisma.answer.findFirst({
        where: {
          attemptId: attemptId,
          questionId: question.id,
          userId: userId,
        },
      });
      console.log({ answer });

      if (answer?.isCorrect) {
        totalCorrect += 1;
      }
    }

    accuracy = (totalCorrect / questions?.length) * 100;
    await this.prisma.attempt.update({
      where: {
        id: attemptId,
        userId: userId,
      },
      data: {
        percentageCorrect: accuracy,
      },
    });
  }
}
