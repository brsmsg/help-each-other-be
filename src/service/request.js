const {
  Request
} = require('../db/model')

const addRequest = async ({
  postId,
  applicantId,
  text
}) => {
  const result = await Request.create({
    applicant_id: applicantId,
    post_id: postId,
    remark: text,
    is_accept: false,
  })
  if (!result) return result;
  return result.dataValues;
}

const getStatus = async ({
  postId,
  applicantId
}) => {
  const queryConfig = {
    attributes: ['is_accept'],
    where: {
      applicant_id: applicantId,
      post_id: postId
    }
  }
  const result = await Request.findOne(queryConfig);
  if (!result) return result;
  return result.dataValues;
}

const getRequestsNum = async (postId) => {
  const queryConfig = {
    where: {
      post_id: postId,
      is_accept: true
    }
  }
  const result = await Request.findAll(queryConfig);
  if (!result) return 0;
  else return result.length;
}

const countHelp = async (userId) => {
  const result = await Request.findAll({
    where: {
      applicant_id: userId,
      is_accept: true
    }
  })
  if (!result) return 0;
  else return result.length;
}


module.exports = {
  addRequest,
  getStatus,
  getRequestsNum,
  countHelp
}