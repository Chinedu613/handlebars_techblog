const router = require('express').Router();
const { blogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all Blog Post and JOIN with user data
router.get('/', async (req, res) => {


  try {
    const blogData = await blogPost.findAll({
      attributes:['id', 'title', 'content','createdAt'],
        include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'createdAt'],
          include: {
            model: User,
            attributes: ['email'],
          },
        }, 
        {
          model: User,
          attributes: ['email'],
        },
      ], 
    });
    
    if(!blogData){
      console.log('are we here');
      res.render('homepage');
    }
    // Serialize data so the template can read it
    const blogPosts = blogData.map((blogPost) => blogPost.get({ plain: true }));
    console.log(blogPosts);
    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get A Single Blog Post
router.get('/blogpost/:id', async (req, res) => {
  try {
    const blogData = await blogPost.findByPk(req.params.id, {
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
    const viewPost = blogData.get({ plain: true });

    console.log('something happens right before this', viewPost);
    res.render('post', {
      ...viewPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

 // Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: blogPost }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
}); 

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  console.log('is the logging button working')
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
})

module.exports = router;
