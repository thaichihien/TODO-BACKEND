import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { database } from './todos.database';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private counter = 0;

  create(createTodoDto: CreateTodoDto): Todo[] {
    database.push({
      id: this.counter++,
      checked: false,
      ...createTodoDto,
    });
    return database;
  }

  findAll(): Todo[] {
    return database;
  }

  findOne(id: number): Todo {
    const todo = database.find((todo) => todo.id === id);
    if (!todo) {
      throw new BadRequestException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  updateChecked(id: number, checked: boolean): Todo {
    const todo = database.find((todo) => todo.id === id);

    if (!todo) {
      throw new BadRequestException(`Todo with id ${id} not found`);
    }

    if (checked === undefined || checked === null) {
      todo.checked = false;
    } else {
      todo.checked = checked;
    }

    return todo;
  }

  // update(id: number, updateTodoDto: UpdateTodoDto) {
  //   return database[database.findIndex((todo) => todo.id === id)] = {
  //     id,

  //     ...updateTodoDto,
  //   }
  // }

  remove(id: number): Todo[] {
    const todoIndex = database.findIndex((todo) => todo.id === id);

    if (todoIndex < 0) {
      throw new BadRequestException(`Todo with id ${id} not found`);
    }

    database.splice(todoIndex, 1);

    return database;
  }
}
