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


module.exports = {
  addRequest,
  getStatus
}