## 疑问和问题

1.跨域的配置要放在路由注册之前

~~~js
// 支持跨域 
// 注一定要放在路由注册的前面不然不起作用
app.use(cors());
const UserRouter = require("./routes/user-router")
app.use(UserRouter)
~~~

2.前端通过axios获取请求头header的数据在node需要配置

~~~js
app.all('*', function (req, res, next) {
  // 允许前端获取响应头信息
  res.header("Access-Control-Expose-Headers", "*");
  next();
});
~~~

3.前端报错

~~~js
// 在axios响应拦截器中会进行判断
if (response.data.code === 200) {
    return response?.data?.data
} else if (response.data.code === 400) {
    Promise.reject(response)
} else {
    Promise.reject(response)
}
// 所以在后端需要返回code状态码
~~~

4.jsonwebtoken
