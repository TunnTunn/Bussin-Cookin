const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const { uploadBlogImage } = require("../services/uploadService");
const commentController = require("../controllers/commentController");

// Setup multer for blog image uploads
const upload = multer({ dest: "uploads/blogs/" });

// Protected routes - đặt các specific routes trước
router.get("/create", auth.requireAuth, blogController.createBlog);
router.post("/store", auth.requireAuth, upload.single("blog-image"), blogController.storeBlog);

// Public routes - đặt các dynamic routes sau
router.get("/", blogController.showBlogs);
router.get("/search", blogController.searchBlogs);
router.get("/:slug", blogController.showBlogDetail);
router.post("/:slug/vote", auth.requireAuth, blogController.handleVote);
router.post("/:slug/comment", auth.requireAuth, commentController.addComment);
router.put("/:slug/comment/edit", auth.requireAuth, commentController.updateComment);
router.delete("/:slug/comment/delete", auth.requireAuth, commentController.deleteComment);
router.get("/:slug/edit", auth.requireAuth, blogController.editBlog);
router.put("/:slug", auth.requireAuth, upload.single("blog-image"), blogController.updateBlog);
router.delete("/:slug", auth.requireAuth, blogController.deleteBlog);

module.exports = router;
