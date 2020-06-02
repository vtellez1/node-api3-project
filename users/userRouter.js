const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

// Insert new user --/api/users
router.post('/', validateUser, (req, res) => {
  const {name} = req.body;
  Users.insert(name)
  .then(newUser => {
    res.status(201).json(newUser)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving user to the database"
    });
  });
});

// Insert new post for specific user -- /api/users/:id/posts
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  Posts.insert(post.req.body)
  .then(post =>{
    res.status(201).json(post);
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json({
      error: "Error adding post."
    });
  });
});

// GET all users -- /api/users
router.get('/', (req, res) => {
  Users.get(req.query)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The Users information could not be retrieved."
    });
  });
});

// GET specific user -- /api/users/:id
router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "User info could not be retrieved."
    });
  });
});


// GET specific user's posts -- /api/users/:id/posts
router.get('/:id/posts', validateUserId, (req, res) => {
 Users.getUserPosts(req.params.id)
 .then(post => {
   res.status(200).json(post)
 })
 .catch(error =>{
console.log(error);
res.status(500).json({
  error: "The post info could not be retrieved."});
 });
});


// DELETE specific user -- /api/users/:id
router.delete('/:id', validateUserId, (req, res) => {
 Users.remove(req.params.id)
 .then(deleted =>{
   res.status(204).json(deleted);
 })
 .catch(error => {
   console.log(error);
   res.status(500).json({
     error: "The post could not be removed"
   });
 });
});


// UPDATE specific user -- /api/users/:id
router.put('/:id', validateUserId, (req, res) => {
 const id = req.params.id;
 const { name } = req.body;

 if(!name){
   res.status(400).json({
     errormessage: "Please provide a name to modify user."
   });
 }

 Users.update(id, name)
 .then(updatedUser => {
  res.status(200).json(updatedUser);
 })
 .catch(error => {
   console.log(error);
   res.status(500).json({
     error: "The user information could not be modified"
   });
 });
});



//custom middleware ----------------------------------------------------|

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
  .then(user =>{
    if(user){
      req.user = user;
      next();
    } else {
    res.status(400).json({message: "invalid user id"});
  }})
};

function validateUser(req, res, next) {
  if(!req.body){
    res.status(400).json({message: "missing user data"})
  } else if(!req.body.name){
    res.status(400).json({message: "missing required name field"})
  } else {
    next();
  }
};

function validatePost(req, res, next) {
  if(!req.body){
    res.status(400).json({message: "missingpost data "})
  } else if(!req.body.text){
    res.status(400).json({message: "missing required text field"})
  } else {
    next();
  }
};

module.exports = router;
