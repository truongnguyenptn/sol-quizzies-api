import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { StartGameDto } from './dto/start-game.dto';
import { SubmitgameDto } from './dto/submit-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
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
    console.log("start")
    const { gameId, userId } = startGameDto;
    return this.gamesService.startGame(startGameDto);
  }

  @Post('statistics')
  gameStatistics(@Body() startGameDto: StartGameDto) {
    console.log("statistics")
    const { gameId, userId } = startGameDto;
    return this.gamesService.gameStatistics(gameId, userId );
  }

  @Post('submit')
  submitGame(@Body() submitgameDto: SubmitgameDto) {
    console.log("submit")
    const { gameId, userId } = submitgameDto;
    return this.gamesService.submitGame(submitgameDto);
  }
}
