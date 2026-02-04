import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { AccessToken } from './access-token.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sys_user')
export class User {
  @ApiProperty({ description: '用户ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '用户名', example: 'admin' })
  @Column({ unique: true, comment: '用户名' })
  username: string;

  @ApiProperty({ description: '密码 (加密存储)' })
  @Column({ select: false, comment: '密码' })
  password: string;

  @ApiProperty({ description: '邮箱', example: 'admin@example.com' })
  @Column({ nullable: true, comment: '邮箱' })
  email: string;

  @ApiProperty({ description: '是否激活' })
  @Column({ default: true, comment: '是否激活' })
  isActive: boolean;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: Date;

  @ApiProperty({ description: '用户拥有的角色', type: () => [Role] })
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'sys_user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @OneToMany(() => AccessToken, (token) => token.user)
  accessTokens: AccessToken[];
}
