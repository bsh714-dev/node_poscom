const express = require('express');
const router = express.Router();
const postsRouter = require("./posts");
const commentRouter = require("./comments");

router.use('/comments', commentRouter);
router.use("/posts", postsRouter);

router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;