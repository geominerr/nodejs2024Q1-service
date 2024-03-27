import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Create  new user.' })
  @ApiResponse({ status: 201, description: 'Create user', type: User })
  @ApiResponse({ status: 400, description: 'Body not contain required fields' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve a list of all users.',
  })
  @ApiResponse({ status: 200, description: 'Get all users', type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by id',
    description: 'Retrieve a single user by id.',
  })
  @ApiResponse({ status: 200, description: 'Get user by id', type: User })
  @ApiResponse({ status: 400, description: 'Invalid userId (not uuid)' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user password',
    description: 'Update the password for a specific user.',
  })
  @ApiResponse({ status: 200, description: 'Update password', type: User })
  @ApiResponse({ status: 400, description: 'Invalid userId (not uuid)' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Wrong old password' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete a specific user by id.',
  })
  @ApiResponse({ status: 204, description: 'Delete user' })
  @ApiResponse({ status: 400, description: 'Invalid userId (not uuid)' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
