const express = require('express');

const postsRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
function logger(req, res, next) {
  console.log(
    `Method:${req.method} URL:${req.url} Time:[${new Date().toISOString()}]`
  );
  next();
};

server.use(logger);
server.use('/api/posts', postsRouter);
server.use('/api/users', userRouter);

module.exports = server;
