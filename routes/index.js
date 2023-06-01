const router = require('express').Router();
const userRoutes = require('./userRouter');
const cardRoutes = require('./cardRouter');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

module.exports = router;
