const router = require('express').Router();
const { User, Comment} = require('../../models');
const withAuth = require('../../utils//auth');


router.get('/', withAuth, async (req, res) => {
    try{ 
        const commentData = await Comment.findAll({include: User});
        res.status(200).json(commentData);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        console.log(req.body,'---------------let see')
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!deleteComment) {
            res.status(404).json({ message: 'No comment to delete found' });
            return;
        }
        res.status(200).json(deleteComment);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;