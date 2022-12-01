const express = require('express');
const comment = require('../schemas/comment');
const router = express.Router();
const Comment = require("../schemas/comment");
const Posts = require("../schemas/post");

router.post('/:_postsId', async (req, res) => {
    try {
        const { _postsId } = req.params;
        const existPosts = await Posts.findOne({ _id: _postsId });
        const { content } = req.body;
        if (existPosts === null) {
            return res.status(400).json({ success: false, errorMessage: "게시글을 찾을 수 없습니다." });
        }
        if (content.length === 0) {
            return res.status(400).json({ success: false, errorMessage: "댓글을 입력하세요" });
        }
        await comment.create({
            user: req.body.user,
            password: req.body.password,
            content: req.body.content,
            postsId: req.params._postsId,


        });
        return res.status(201).json({ Message: "댓글을 생성하였습니다." });
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "댓글 조회에 실패하였습니다." });
    }
});

router.get("/", async (req, res) => {
    const xd = await Posts.find({ postsId: _postsId });
    const result = xd.map(item => {
        return {
            postsId: item.postId,
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
        const existPosts = await comment.find({ postsId: _postsId });

        if (existPosts === null) {
            return res.status(400).json({ success: false, errorMessage: "데이터 형식이 올바르지 않습니다." });
        }
        const result = existPosts.map(item => {
            return {
                commentId: item._id,
                user: item.user,
                content: item.content,
                createdAt: item.createdAt
            };
        });

        res.json({ data: result });

    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "댓글 조회에 실패하였습니다." });
    }
});

router.put("/:_commentId", async (req, res) => {
    try {
        const { _commentId } = req.params;
        const { password, content } = req.body;
        if (content === null) {
            return res.status(400).json({ success: false, errorMessage: "댓글 내용을 입력해주세요." });
        }
        const existPosts = await Comment.find({ _id: _commentId });
        if (existPosts.length) {
            await Comment.updateOne({ _id: _commentId }, { $set: { content } });
        }
        res.json({ "message": "게시글을 수정하였습니다." });
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "게시글 조회에 실패하였습니다." });
    }
})

router.delete("/:_commentId", async (req, res) => {
    try {
        const { _commentId } = req.params;
        const { password } = req.body;
        if (_commentId === null) {
            return res.status(400).json({ success: false, errorMessage: "데이터 형식이 올바르지 않습니다." });
        }
        const existPosts = await Comment.find({ _id: _commentId });
        if (existPosts.length) {
            await Comment.deleteOne({ _id: _commentId });
        }
        res.json({ "message": "게시글을 삭제하였습니다." });
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "게시글 조회에 실패하였습니다." });

    }
})



module.exports = router;