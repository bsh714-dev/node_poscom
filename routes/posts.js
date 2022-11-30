const express = require('express');
const router = express.Router();

const Posts = require("../schemas/post");
router.post("/", async (req, res) => {
  try {
    const { user, password, title, content } = req.body;
    if (req.body == 0) {
      return res.status(400).json({ success: false, errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
    await Posts.create({ user, password, title, content });
    res.status(200).send({ "message": "게시글을 생성하였습니다." });
  } catch (error) {
    console.log(error)
    res.status(400).send({ "message": "데이터 형식이 올바르지 않습니다." });
  }
});


router.get("/", async (req, res) => {
  const xd = await Posts.find({});
  const result = xd.map(item => {
    return {
      postsId: item._id,
      user: item.user,
      title: item.title,
      content: item.content,
      createdAt: item.createdAt
    };
  });

  res.json({ data: result });
});

router.get('/:_postsId', async (req, res) => {
  try {
    const { _postsId } = req.params;
    const existPosts = await Posts.findOne({ _id: _postsId });
    if (_postsId === null) {
      return res.status(400).json({ success: false, errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
    const result = {
      postsId: existPosts._id,
      user: existPosts.user,
      title: existPosts.title,
      content: existPosts.content,
      createdAt: existPosts.createdAt
    };
    res.json({ data: result });
  } catch (error) {
    console.log(error)
    res.status(400).send({ "message": "게시글 조회에 실패하였습니다." });
  }
});

router.put("/:_postsId", async (req, res) => {
  try {
    const { _postsId } = req.params;
    const { password, title, content } = req.body;
    if (_postsId === null) {
      return res.status(400).json({ success: false, errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
    const existPosts = await Posts.find({ _id: _postsId });
    if (existPosts.length) {
      await Posts.updateOne({ _id: _postsId }, { $set: { title } }, { $set: { content } });
    }
    res.json({ "message": "게시글을 수정하였습니다." });
  } catch (error) {
    console.log(error)
    res.status(400).send({ "message": "게시글 조회에 실패하였습니다." });
  }
})

router.delete("/:_postsId", async (req, res) => {
  try {
    const { _postsId } = req.params;
    const { password } = req.body;
    const existPosts = await Posts.findOne({ _id: _postsId });
    if (existPosts === null) {
      return res.json({ "message": "게시글 조회에 실패했습니다." })
    }
    if (existPosts.password !== Number(password)) {
      console.log(existPosts.password)
      return res.json({ "message": "비밀번호가 다릅니다." });
    }
    await Posts.deleteOne({ _id: _postsId });
    return res.json({ "message": "게시글을 삭제하였습니다." });
  } catch (error) {
    console.log(error)
    res.status(400).send({ "message": "게시글 조회에 실패하였습니다." });
  }
});




module.exports = router;