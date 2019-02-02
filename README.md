# Koa-mvc
这是一套基于 [koa2](https://github.com/koajs/koa) 从零开始搭建的 MVC 框架

#### 环境 (Environment)
* NodeJS `v10.13.0`
* MySQL `v8.0.13`
* Koa `v2.6.2`

#### 特点 (Feature)
1. 使用 koa-jwt + jsonwebtoken 的登录验证方式，适用于`MVC`, `RestfulAPI` 的项目架构
2. 使用 ES7 装饰器语法 `decorator` 来写控制器
3. 使用 Sequelize + MySQL 的 ORM 框架

#### 中间件 (Middlewares)
* `koa`, `koa-logjs`, `koa-bodyparser`, `koa-static`, `koa-compress`
* `koa-conditional-get`, `koa-etag`, `koa-session`, `koa-router`
* `art-template`, `koa-art-template`
* `sequelize`, `mysql2`
* `koa-jwt`, `jsonwebtoken`, `svg-captcha`

#### 目录 (Path)
* app
   * controllers `Include Router`
   * middleware `Middleware Groups`
   * sequelize `ORM for MySQL`
   * views `Art-template View`
* db `MySQL config`
* logs `Koa-logger logs`
* static
* test `Describe it here with Mocha`

#### 启动 (Start)
```
$ yarn install
$ yarn global install nodemon
$ npm start
```
Visit: [http://localhost:3000](http://localhost:3000)
