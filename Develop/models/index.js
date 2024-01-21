const { User, Post, Comment } = require('./models');
const sequelize = require('./config/connection');

User.hasMany(Post, {
  foreignKey: 'author',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {    
    foreignKey: 'author',
    onDelete: 'CASCADE'
});


Post.belongsTo(User, {
  foreignKey: 'username'
}); 

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, { 
    foreignKey: 'post_id'
});

Comment.belongsTo(User, { 
    foreignKey: 'username'
});





module.exports = { User, Post, Comment };