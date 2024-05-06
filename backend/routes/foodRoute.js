import express from "express"
import { addFood ,listFood,removeFood} from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();

// Image  Storage Engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename: function(req,file,cb){
        return cb(null,`${Date.now()}${file.originalname}`)
    }
});
const upload = multer({storage:storage});


//add food item
foodRouter.post("/add",upload.single("image"),addFood);

// all food
foodRouter.get("/list",listFood);

// remove food
foodRouter.post("/remove",removeFood);


export default foodRouter;