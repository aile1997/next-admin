import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('角色管理')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: '创建角色', description: '仅限 admin 角色操作' })
  create(@Body() roleData: { name: string; description?: string }) {
    return this.rolesService.create(roleData);
  }

  @Get()
  @Roles('admin', 'user')
  @ApiOperation({ summary: '获取所有角色' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: '删除角色' })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
