# Next-Admin 后端服务

这是一个基于 **NestJS**、**TypeORM** 和 **PostgreSQL** 构建的后端管理系统基础框架。

## 核心功能

- **用户管理**: 包含用户注册、登录。
- **权限控制**: 基于 **JWT** 的认证和基于 **Roles** 的 RBAC 权限控制。
- **数据库**: 使用 PostgreSQL，通过 TypeORM 进行 ORM 操作。
- **接口文档**: 集成 **Swagger**，方便接口调试。
- **安全性**: 使用 `bcrypt` 对用户密码进行哈希加密。

## 数据库表结构

| 表名 | 说明 | 关联 |
|------|------|------|
| `sys_user` | 用户表 | 存储基本用户信息 |
| `sys_role` | 角色表 | 存储角色定义（如 admin, user） |
| `sys_user_roles` | 用户-角色关联表 | 多对多关系映射 |
| `sys_access_token` | 访问令牌表 | 记录用户登录产生的令牌 |

## 快速开始

### 1. 环境准备
确保你已经安装了 Node.js, pnpm 以及 PostgreSQL。

### 2. 配置环境
复制 `.env` 文件并根据你的数据库信息进行修改：
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=next_admin
JWT_SECRET=your_secret_key
PORT=3000
```

### 3. 安装依赖
```bash
pnpm install
```

### 4. 启动服务
```bash
# 开发模式
pnpm run start:dev

# 生产模式
pnpm run build
pnpm run start:prod
```

### 5. 查看文档
启动后访问：`http://localhost:3000/docs`

## 项目结构说明

- `src/entities`: 数据库实体定义
- `src/auth`: 认证模块（登录、注册、JWT 策略、守卫）
- `src/users`: 用户模块
- `src/roles`: 角色模块
- `src/main.ts`: 应用入口，包含 Swagger 和全局管道配置
