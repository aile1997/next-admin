import { SetMetadata } from '@nestjs/common';

// 定义角色元数据键名
export const ROLES_KEY = 'roles';

/**
 * 角色装饰器，用于标记接口需要的权限
 * @param roles 角色名称列表
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
