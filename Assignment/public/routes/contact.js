var express = require('express');
var router = express.Router();
const Contact = require('../models/commMdl').Contact;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('contact', { title: 'Contact' });
});


// // Show the create form
// router.get('/create', function(req, res, next) {
//     res.render('contact-create', { title: 'Thank You' });
// });

/* GET all posts listing. */
router.get('/all', function(req, res, next) {
    Contact.find((err, posts) => {
        console.log(posts);
        res.render('contact-list', { contactPosts: posts });
    });
});

// To create a new post
router.post('/', function(req, res, next) {
    const data = req.body;
    const post = new Contact();
    post.postfname = data.firstname;
    post.postlname = data.lastname;
    post.postemail = data.email;
    post.postcomments = data.comment;

    console.log("Logging Data to Console");
    console.log(data);
    console.log(data.firstname, data.lastname, data.email, data.comment);

    post.save(err => {
        // if(err) throw err;
        if (err) {
            const errorArray = [];
            const errorKeys = Object.keys(err.errors);
            errorKeys.forEach(key => errorArray.push(err.errors[key].message));
            return res.render("contact", {
                postdata: req.body,
                errors: errorArray
            });
        }
        res.render("contact-create", {
            title: 'Thank You',
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            comment: data.comment
        });

    });
});

// Shows a single post
router.get('/:pemail', function(req, res, next) {
    const pstemail = req.params.pemail;
    Contact.find({ postemail: pstemail }, (err, post) => {
        res.render('contact-list', { contactPosts: post });
    });
});

module.exports = router;