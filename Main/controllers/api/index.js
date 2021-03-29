const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');

router.use('/users', userRoutes);
router.use('/blog', blogPostRoutes);

module.exports = router;
