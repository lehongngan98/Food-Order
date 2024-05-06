import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs'



//add food item
const addFood = async(req,res) =>{

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        console.log("Food add successfull!");
        res.json({success:true,message:"Food add successfull!"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Food add failed!"});
    }
}

//all food
const listFood = async(req,res) =>{
    try {
        const foods = await foodModel.find();
        res.json({success:true,foods});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed to get food!"});
    }
    
}

//remove food
const removeFood = async (req, res) => {
    try {
        const { id } = req.body;
        // Input validation
        if (!id) {
            return res.status(400).json({ success: false, message: "Food ID is required." });
        }
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: `Food not found with id: ${id}` });
        }
        // Delete image
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error("Error deleting image:", err);
            }
        });
        // Delete food from database
        await foodModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Food removed!" });
    } catch (error) {
        console.error("Failed to remove food:", error);
        res.status(500).json({ success: false, message: "Failed to remove food!" });
    }
};




export{
    addFood,
    listFood,
    removeFood
}