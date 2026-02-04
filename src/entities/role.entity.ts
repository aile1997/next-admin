import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sys_role')
export class Role {
  @ApiProperty({ description: '角色ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '角色名称', example: 'admin' })
  @Column({ unique: true, comment: '角色名称' })
  name: string;

  @ApiProperty({ description: '角色描述', example: '管理员' })
  @Column({ nullable: true, comment: '角色描述' })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
