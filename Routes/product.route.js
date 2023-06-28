const express = require("express");
const { ProdModel } = require("../model/products.model");
// const { ProdModel } = require("../model/products.model");
const productRouter = express.Router();
 
 productRouter.get("/" , async(req, res) =>{
     
      try {
        const data =await ProdModel.find()
        res.send(data)
      } catch (error) {
        res.send({
            message: error.message
        })
      }  
 })  



 productRouter.post("/add" , async(req, res) => {
         try {
           let data =  new ProdModel(req.body)
            await data.save()
            res.send({
                message:"Data Added successfully"
            })
         } catch (error) {
            res.send({
                message: error.message
            })
         }
 })

 productRouter.patch("/update/:id", async (req, res) => {
    let { id } = req.params;
    try {
      await ProdModel.findByIdAndUpdate({ _id: id }, req.body);
      res.send({
        message: "Data updated succesfully",
      });
    } catch (error) {
      res.send(error);
    }
  });
  
productRouter.delete("/delete/:id", async (req, res) => {
    let { id } = req.params;
    try {
      await ProdModel.findByIdAndDelete({ _id: id });
      res.send({
        message: "Data has been deleted succesfully",
      });
    } catch (error) {
      res.send(error);
    }
  });
  

module.exports = {productRouter}