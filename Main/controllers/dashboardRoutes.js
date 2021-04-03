const router = require('express').Router();
const { blogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await blogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'content'],
      include: [
        {
          model: User,
          attributes: ['email'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'createdAt'],
          include: {
            model: User,
            attributes: ['email'],
          },
        },
      ],
    });
    const blogPosts = blogData.map((blog) => blogPost.get({ plain: true }));

    res.render('dashboard', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await blogPost.findByPk({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'content', 'createdAt'],
      include: [
        {
          model: User,
          attributes: ['email'],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'title',
            'content',
            'post_id',
            'user_id',
            'createdAt',
          ],
          include: {
            model: User,
            attributes: ['email'],
          },
        },
      ],
    });
    const editPost = blogPostData.map((post) =>
      blogPostData.get({ plain: true })
    );

    res.render('edit', {
      editPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('new-post', withAuth, (req, res) => {
  res.render('new-post');
});

module.exports = router;
