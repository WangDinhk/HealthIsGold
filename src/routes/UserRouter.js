const express=require("express");
const routes=express.Router();
const userController=require("../controllers/UserController");

routes.post('/sign-up',userController.createUser);
routes.post('/sign-in',userController.signInUser);
routes.put('/update-user/:id',userController.updateUser);
module.exports=routes;
