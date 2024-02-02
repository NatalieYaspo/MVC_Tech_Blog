const router = require('express').Router();
const { BlogPost, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET a blog by ID
router.get('/blogPost/:id', async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogPost = blogData.get({ plain: true });
    // console.log(blogPost);
    res.render('blogPost', {
      ...blogPost,
      loggedIn: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a blog
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a blog //NEED TO MAKE WORK
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedBlogData = await BlogPost.update(
      {
        title: req.body.title,
        content: req.body.content,
      }, 
      {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedBlogData[0]) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }
    res.status(200).json(updatedBlogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a blog
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
