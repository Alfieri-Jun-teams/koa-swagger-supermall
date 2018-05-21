import { SwaggerAPI } from 'koa-joi-router-docs'
import Router from 'koa-joi-router'
const router = Router()

const login = require('./routes/login')
const user = require('./routes/user')
const goods = require('./routes/goods')
const cart = require('./routes/cart')
const order = require('./routes/order')
/**
   * Generate Swagger json from the router object
   */
const generator = new SwaggerAPI()
generator.addJoiRouter(login)
generator.addJoiRouter(user)
generator.addJoiRouter(goods)
generator.addJoiRouter(cart)
generator.addJoiRouter(order)

const spec = generator.generateSpec({
  info: {
    title: 'koa-supermall API',
    description: 'supermall',
    version: '1.0.0'
  },
  basePath: '/',
  tags: [{
    name: 'users',
    description: `备注：数组data里边的内容由result组成 用户创建 查询 修改个人信息 删除接口`
  }]
}, {
  defaultResponses: {} // Custom default responses if you don't like default 200
})

/**
   * Swagger JSON API
   */
router.get('/_api.json', async ctx => {
  ctx.body = JSON.stringify(spec, null, '  ')
})

/**
   * API documentation
   */
router.get('/apiDocs', async ctx => {
  ctx.body = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>SuperMall API</title>
    </head>
    <body>
      <redoc spec-url='/_api.json' lazy-rendering></redoc>
      <script src="https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"></script>
    </body>
    </html>
    `
})

module.exports = router
