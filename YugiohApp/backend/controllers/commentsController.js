const  Comment  = require('../models/Comment');
const User = require('../models/User');


exports.getCommentsForDeck = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { deckId: req.params.id },
      include: [{ model: User, as: 'user' }]
    });
    res.json(comments);
  } 
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to load comments' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { content, userid } = req.body;
    const comment = await Comment.create({
      content,
      userId: userid, 
      deckId: req.params.id
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

exports.editComment = async (req, res) => {
  try {
    const { commentId} = req.params;
    const { content, userid } = req.body;
    console.log('Editing comment ID:', commentId); 
    // Find the comment by ID
    const comment = await Comment.findByPk(commentId,{include: [{ model: User, as: 'user' }] });
    console.log(comment, content)

    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    if (comment.userId !== userid) {
      return res.status(403).json({ error: 'You are not authorized to edit this comment' });
    }
    console.log("awaiting save")
    await comment.update({content:content});
    // Update the comment content
    //comment.content = content;
    console.log("save")
    //await comment.save();

    res.json(comment);
  } 
  catch (error) {
    res.status(500).json({ error: 'Failed to edit comment' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userid } = req.query;
    const comment = await Comment.findByPk(commentId);
    console.log(comment)

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    // if (comment.userId !== userid) {
    //   return res.status(403).json({ error: 'You are not authorized to delete this comment' });
    // }

    // Delete the comment
    await comment.destroy();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};


