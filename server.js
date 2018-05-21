const koa = require('koa')
const app = new koa()

app.use(require('./swagger').middleware())
app.listen(5566, () => {
  console.log('API docs url: http://localhost:5566/apiDocs')
})
