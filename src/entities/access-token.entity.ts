import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sys_access_token')
export class AccessToken {
  @ApiProperty({ description: '令牌ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'JWT 令牌字符串' })
  @Column({ type: 'text', comment: 'JWT令牌' })
  token: string;

  @ApiProperty({ description: '过期时间' })
  @Column({ comment: '过期时间' })
  expiresAt: Date;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.accessTokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;
}
