const router = require('express').Router();
const { blogPost, User } = require('../../models');
const withAuth = require('../../utils/auth');


// Get all Blog data
router.get('/',  withAuth,  async (req, res) => {
  try {
    const blogData = await blogPost.findAll({ include: User });
    res.status(200).json(blogData);
  } catch(err) {
    res.status(500).json(err);
  }
});
// Get a Particular Post 
router.get('/:id', withAuth,  async (req, res) => {
  try {
    const blogPostData = await blogPost.findByPk( req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "email"],
        },
        {
          model: Comment,
          attributes: ["id","comment_text", "date_created", "user_id"],
        },
      ],
    });
    if(!blogPostData) {
      res.status(404).json({ message: "Can't find blog post!" });
      return;
    }
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Sends Blog Post Data to Database
router.post('/', withAuth, async (req, res) => {
  
  try {
    const newblogPost = await blogPost.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(newblogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a Blog Post
router.put('/:id', withAuth, async (req, res) => {

  try {
    const postData = await blogPost.update({
      ...req.body
    },
    {
      where: {
        id: req.params.id
      }
    });
    console.log(postData);
      res.status(200).json(postData);

  } catch(err){
    console.log(err);
      res.status(500).json(err);
  }
})
// Delete Blog Post Data 
router.delete('/:id', withAuth,  async (req, res) => {
  console.log('we made it here')
  try {
    const blogPostData = await blogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No blogPost found with this id!' });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
