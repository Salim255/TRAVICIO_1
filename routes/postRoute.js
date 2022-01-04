const express = require('express');

const router = express.Router();

const authControler = require('../controlers/authControler');
const postControler = require('../controlers/postControler');

router.route('/')
.post(authControler.protect, postControler.creatpost)
.get(authControler.protect,  postControler.getAllPosts)
;


router.route('/like/:id')
    .get(authControler.protect, postControler.getPostById )
    .delete(authControler.protect, postControler.deletePostById)
    .put(authControler.protect, postControler.likePostById);

router.route('/unlike/:id')
    .put(authControler.protect, postControler.unlikePostById);

router.route('/comment/:id')
    .put(authControler.protect, postControler.addCommentOnPost)

router.route('/comment/:id/:comment_id')
    .delete(authControler.protect, postControler.deleteCommentOnPostById );

module.exports = router;