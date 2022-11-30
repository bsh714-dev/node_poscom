const express = require('express');
const router = express.Router();


const Comment = require("../schemas/comment");
router.post("/", async (req, res) => {
    try {
        const { user, password, content } = req.body;
        if (content === null) {
            return res.status(400).json({ success: false, errorMessage: "댓글내용을 입력해주세요." });
        }
        await Comment.create({ user, password, content });
        res.status(200).send({ "message": "댓글을 생성하였습니다." });
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "데이터 형식이 올바르지 않습니다." });
    }
});

router.get("/", async (req, res) => {
    const xd = await Comment.find({});
    const result = xd.map(item => {
        return {
            postsId: item._id,
            user: item.user,
            content: item.content,
            createdAt: item.createdAt
        };
    });

    res.json({ data: result });
});

router.get('/:_postsId', async (req, res) => {
    try {
        const { _postsId } = req.params;
        const existPosts = await Comment.findOne({ _id: _postsId });
        if (_postsId === null) {
            return res.status(400).json({ success: false, errorMessage: "데이터 형식이 올바르지 않습니다." });
        }
        const result = {
            commentId: existPosts._id,
            user: existPosts.user,
            title: existPosts.title,
            content: existPosts.content,
            createdAt: existPosts.createdAt
        };
        res.json({ data: result });
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "댓글 조회에 실패하였습니다." });
    }
});

router.put("/:_postsId", async (req, res) => {
    try {
        const { _postsId } = req.params;
        const { password, content } = req.body;
        if (content === null) {
            return res.status(400).json({ success: false, errorMessage: "댓글 내용을 입력해주세요." });
        }
        const existPosts = await Comment.find({ _id: _postsId });
        if (existPosts.length) {
            await Comment.updateOne({ _id: _postsId }, { $set: { content } });
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
        if (_postsId === null) {
            return res.status(400).json({ success: false, errorMessage: "데이터 형식이 올바르지 않습니다." });
        }
        const existPosts = await Comment.find({ _id: _postsId });
        if (existPosts.length) {
            await Comment.deleteOne({ _id: _postsId });
        }
        res.json({ "message": "게시글을 삭제하였습니다." });
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "게시글 조회에 실패하였습니다." });

    }
})



module.exports = router;