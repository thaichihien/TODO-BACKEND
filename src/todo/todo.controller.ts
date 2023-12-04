import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { ApiTags,ApiResponse,ApiOkResponse,ApiBadRequestResponse,ApiOperation } from '@nestjs/swagger';

@ApiTags("Todo")
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiResponse({
    status: 201,
    isArray: true,
    type: Todo
    
  })
  @ApiOperation({summary:"Create a new todo"})
  create(@Body() createTodoDto: CreateTodoDto) : Todo[] {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: Todo
  })
  @ApiOperation({summary:"Get all todos"})
  findAll(): Todo[]  {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: Todo
  })
  @ApiBadRequestResponse({
    schema :{
      example : {
        statusCode : 400,
        message : "Todo with id 1 not found",
        error : "Bad Request"
      }
    }
  })
  @ApiOperation({summary:"Get a todo by id"})
  findOne(@Param('id') id: string) : Todo {
    return this.todoService.findOne(+id);
  }

  @Put(':id')
  @ApiOkResponse({
    type: Todo
  })
  @ApiBadRequestResponse({
    schema :{
      example : {
        statusCode : 400,
        message : "Todo with id 1 not found",
        error : "Bad Request"
      }
    }
  })
  @ApiOperation({summary:"check or uncheck a todo with id, using checked query param"})
  update(@Param('id') id: string, @Query('checked') checked: boolean): Todo {
    return this.todoService.updateChecked(+id, checked);
  }

  @Delete(':id')
  @ApiOkResponse({
    isArray: true,
    type: Todo
  })
  @ApiOperation({summary:"Delete a todo by id"})
  remove(@Param('id') id: string) : Todo[] {
    return this.todoService.remove(+id);
  }
}


