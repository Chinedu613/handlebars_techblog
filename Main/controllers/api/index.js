const router = require('express').Router();
// API Routes
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/blogpost', blogPostRoutes);
router.use('/comments', commentRoutes)

module.exports = router;
