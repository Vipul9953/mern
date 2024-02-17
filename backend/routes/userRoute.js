const express = require('express');
const { getAllUser, createUser, editUser, deleteUser, addSubject, deletesubject, updateSubject } = require('../controllers/userController');

const router = express.Router();

router.route('/get/all/user').get(getAllUser)
router.route('/new/user').post(createUser)
router.route('/user/:id').put(editUser).delete(deleteUser)
router.route('/add/subject/:id').put(addSubject)
router.route('/delete/subject/:id').put(deletesubject)
router.route('/update/subject/:id').put(updateSubject);

module.exports = router;