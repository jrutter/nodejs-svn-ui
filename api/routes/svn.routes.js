const express = require('express');
const router = express.Router();

const controller = require('../controllers/svn.controller');

router.get('/log', controller.getLog);
router.get('/revisions', controller.getRevisionLog);
router.get('/view/:revision', controller.getRevision);
router.get('/latest', controller.getLastRevision);


module.exports = router;
