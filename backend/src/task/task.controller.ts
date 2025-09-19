import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseUUIDPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('task')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    const userId = 'uuid-de-um-usuario-de-teste';
    return this.taskService.create(createTaskDto, userId);
  }

  @Get()
  findAll(@Req() req) {
    const userId = 'uuid-de-um-usuario-de-teste';
    return this.taskService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    const userId = 'uuid-de-um-usuario-de-teste'; 
    return this.taskService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req,
  ) {
    const userId = 'uuid-de-um-usuario-de-teste'; 
    return this.taskService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    const userId = 'uuid-de-um-usuario-de-teste'; 
    return this.taskService.remove(id, userId);
  }
}
