const express=require("express");
const routes=express.Router();
const userController=require("../controllers/UserController");
const IsAdminMiddleWare=require("../middleware/IsAdminMiddleWare");
const User_AdminMiddleWare=require("../middleware/User_AdminMiddleWare");

routes.post('/sign-up',userController.createUser);
routes.post('/sign-in',userController.signInUser);
routes.put('/update-user/:id',userController.updateUser);
routes.delete('/delete-user/:id',IsAdminMiddleWare,userController.deleteUser);
routes.get('/getAllUser',IsAdminMiddleWare,userController.getAllUser);
routes.get('/getDetailUser/:id',User_AdminMiddleWare,userController.getDetailUser);
routes.post('/refreshToken',userController.refreshToken);
module.exports=routes;
