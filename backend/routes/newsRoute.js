const express = require("express");
const router = express.Router();
const NewsItemModel = require("../models/NewsItems");

router.post("/addnewsItem", async function (req, res) {
  try {
    const newItem = new NewsItemModel(req.body);
    await newItem.save();
    res.send("News added successfully");
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/getallnewsItem", async function (req, res) {
  try {
    const data = await NewsItemModel.find(); 
    res.send(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/getnewsitembyid", async function (req, res) {
    try {
      const data = await NewsItemModel.findOne({_id : req.body.newsid}); 
      res.send(data);
    } catch (error) {
      res.status(404).send(error);
    }
  });

  router.post("/getnewsitembyuserid", async function (req, res) {
    try {
      const data = await NewsItemModel.find();
      const userPostedNewsItems = data.filter((obj)=>obj.postedby.userid === req.body.userid)
      res.send(userPostedNewsItems);
    } catch (error) {
      res.status(404).send(error);
    }
  });

  router.post("/editnewsItem", async function (req, res) {
    try {
      await NewsItemModel.findOneAndUpdate({_id : req.body.newsid} , req.body);
      res.send("News edited successfully");
    } catch (error) {
      res.status(404).send(error);
    }
  });

  router.post("/deletenewsItem", async function (req, res) {
    try {
      await NewsItemModel.findOneAndDelete({_id : req.body.newsid});
      res.send("News deleted successfully");
    } catch (error) {
      res.status(404).send(error);
    }
  });
module.exports = router;
