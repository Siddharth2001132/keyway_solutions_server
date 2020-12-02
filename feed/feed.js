const express = require("express");
const router = express.Router();
const feed = require("../db/feedModel");


router.get("/", (req, res) => {
  res.json({
    message: "feed - 🔐",
  });
});

router.post("/post", async (req, res, next) => {
  try {
    const postData = new feed(req.body);
    const posted = await postData.save();
    res.json(posted);
  } catch (error) {
    console.log(error.name);
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

// const allPosts = database.("keywayauth").collection("feeds");

router.get("/post", (req, res) => {
  feed.find().then((post) => {
    res.json(post);
  });
});

router.delete("/post/:_id", (req, res) => {
  feed.findOneAndRemove(req.params._id)
        .then(data => {
            if (!data || data.length == 0) {
                return res.status(404).send({
                    message: " Post not found with id " + req.params._id
                });
            }
            res.send({ message: "Post deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err._id === 'NotFound') {
                return res.status(404).send({
                    message: "Post not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete Post with id " + req.params._id
            });
        });
});

router.put("/post/update/", (req, res, next) => {
  feed.findOneAndUpdate({_id: req.body._id } , {
    username: req.body.username,
    title: req.body.title,
    description: req.body.description,

}, { new: true })
    .then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Post not found with id " + req.params._id
            });
        }
        res.send(data);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post not found with id " + req.params._id
            });
        }
        
        console.log(err, "code");
        return res.status(500).send({
            message: "Error updating Post with id " + req.params._id,
            stack: err.stack
        });
    });
    
})

module.exports = router;
