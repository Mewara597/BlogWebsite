const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Blog = require('../models/Blog');

const router = express.Router();

router.post(
  '/',
  auth,
  [
    body('title').trim().isLength({ min: 3 }).withMessage('Title must have at least 3 characters'),
    body('content').trim().isLength({ min: 10 }).withMessage('Content must have at least 10 characters')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.user.id
      });

      await blog.save();
      res.status(201).json(blog);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    res.json(blog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  const updateFields = {};
  if (title) updateFields.title = title;
  if (content) updateFields.content = content;

  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    blog = await Blog.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });
    res.json(blog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
