const express =require("express");
const { createBlog, deleteBlog, getAllBlogs, getSingleBlogs, getMyblogs, updateBlog } = require("../Controller/blog.controller");
const middleware = require("../Middleware/authUser");


const router= express.Router();

router.post("/create", middleware.isAuthenticated, middleware.isAdmin("admin"), createBlog);
router.delete("/delete/:id",middleware.isAuthenticated,middleware.isAdmin("admin"),deleteBlog);
router.get("/single-blogs/:id",middleware.isAuthenticated,getSingleBlogs);
router.get("/all-blogs",middleware.isAuthenticated,getAllBlogs);
router.get("/my-blog",middleware.isAuthenticated,middleware.isAdmin("admin"),getMyblogs);
router.put("/update/:id",middleware.isAuthenticated,middleware.isAdmin("admin"),updateBlog)
module.exports = router;