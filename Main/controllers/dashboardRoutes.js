const router = require('express').Router();
const { blogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// Find Users Blog Post 
router.get('/', withAuth, async (req, res) => {
  
  try {
    const blogData = await blogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
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
    const viewPost = blogData.map((blogPost) => blogPost.get({ plain: true }));

// Render All Blog Posts on User's Dashboard 
    console.log(...viewPost);

    res.render('dashboard', {
      viewPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Edit Blog Data
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
            'comment_text',
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
    const editPost = blogPostData.map((blogPostData) =>
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
// Create a New Post 
router.get('/new-post', withAuth, (req, res) => {
  res.render('new-post');
});

module.exports = router;
