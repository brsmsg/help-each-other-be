const path = require('path');
const fs = require('fs');
const {
  SuccessModel,
  ErrorModel
} = require("../model/ResModel")
const {
  getPosts,
  getSinglePost,
  createPost
} = require("../service/post")
const {
  getPostFailInfo
} = require("../model/ErrorInfo")

const fetchPosts = async () => {
  const posts = await getPosts();
  return new SuccessModel(posts);
}

const fetchSinglePost = async (postId) => {
  const post = await getSinglePost(postId);
  if (post) {
    return new SuccessModel(post);
  } else {
    return new ErrorModel(getPostFailInfo);
  }
}

const saveImage = async (file) => {
  const dirname = path.resolve(__dirname, '../public/uploads');
  console.log("file", file);
  const reader = fs.createReadStream(file.path);
  const writer = fs.createWriteStream(path.join(dirname, file.name));
  // 管道
  reader.pipe(writer);

  return new SuccessModel(`/uploads/${file.name}`);
}

const newPost = async (postBody) => {
  console.log(postBody);
  const post = await createPost(postBody);
  if (post) {
    return new SuccessModel(post);
  } else {
    return new ErrorModel("上传文章失败");
  }
}

module.exports = {
  fetchPosts,
  fetchSinglePost,
  saveImage,
  newPost
}