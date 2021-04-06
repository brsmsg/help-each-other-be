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
} = require("../model/ErrorInfo");
const {
  getRequestsNum
} = require('../service/request')

const fetchPosts = async (filter) => {
  const posts = await getPosts(filter);
  const accPromiseList = [];
  const accPromise = async (post) => {
    const accNum = await getRequestsNum(post.id);
    Object.assign(post, {
      accNum
    });
  }
  posts.forEach((post) => {
    accPromiseList.push(accPromise(post));
  })
  await Promise.all(accPromiseList);
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
  const reader = fs.createReadStream(file.path);
  const writer = fs.createWriteStream(path.join(dirname, file.name));
  // 管道
  reader.pipe(writer);

  return new SuccessModel(`/uploads/${file.name}`);
}

const newPost = async (postBody) => {
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