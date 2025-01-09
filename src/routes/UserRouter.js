const express=require("express");
const routes=express.Router();
const userController=require("../controllers/UserController");
const IsAdminMiddleWare=require("../middleware/IsAdminMiddleWare");
const User_AdminMiddleWare=require("../middleware/User_AdminMiddleWare");

routes.post('/sign-up',userController.createUser);
routes.post('/sign-in',userController.signInUser);
routes.post('/log-out',userController.logoutUser);
routes.put('/update-user/:id', User_AdminMiddleWare,userController.updateUser);
routes.delete('/delete-user/:id',IsAdminMiddleWare,userController.deleteUser);
routes.get('/getAllUser',IsAdminMiddleWare,userController.getAllUser);
routes.get('/getDetailUser/:id',User_AdminMiddleWare,userController.getDetailUser);
routes.post('/refreshToken',userController.refreshToken);
routes.post('/auth/google-auth',userController.googleLogin);

module.exports=routes;
