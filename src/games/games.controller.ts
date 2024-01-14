import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { StartGameDto } from './dto/start-game.dto';
import { SubmitgameDto } from './dto/submit-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('/create')
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.gamesService.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Game not found',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }

  @Post('start')
  startGame(@Body() startGameDto: StartGameDto) {
    console.log('start');
    const { gameId, userId } = startGameDto;
    return this.gamesService.startGame(startGameDto);
  }

  @Post('statistics')
  gameStatistics(@Body() startGameDto: StartGameDto) {
    console.log('statistics');
    const { gameId, userId } = startGameDto;
    return this.gamesService.gameStatistics(gameId, userId);
  }

  @Post('submit')
  submitGame(@Body() submitgameDto: SubmitgameDto) {
    console.log('submit');
    const { gameId, userId } = submitgameDto;
    return this.gamesService.submitGame(submitgameDto);
  }
}
