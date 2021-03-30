const User = require('./User');
const blogPost = require('./blogPost');
const Comment = require('./comment');

// User can have many Blog Post
User.hasMany(blogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
// User has many commments
User.hasMany(Comment, {
  foreignKey: 'user_id',
});
// Blog post belongs to a User => cannot exist without a User
blogPost.belongsTo(User, {
  foreignKey: 'user_id',
});
// There can be multiple comments per blog post
blogPost.hasMany(Comment, {
  foreignKey: 'post_id',
});
// Comment belongs to a User => cannot exist without a User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});
// Comment belongs to a blog post => cannot exist without a Blog Post
Comment.belongsTo(blogPost, {
  foreignKey: 'post_id',
});

module.exports = { User, blogPost, Comment };
