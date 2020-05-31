'use strict';

// const uuid = require('node-uuid')
const dbOp = require('./dboperation/dbmanager')

const response = {
  statusCode: 200,
  body: {
      message: 'UserId ',
      input: ''
    }
};

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.getUserForDev = (event, content, callback) => {
  const data = JSON.parse(event.body)
  console.log('event ', event)
  const userId = event.pathParameters.uid
  console.log('User id is ', userId)
  const table = 'lambda-services-dev-user'
  var params = {
    TableName:table,
    Key:{
        "userId": userId,
      }
    };
  dbOp.getUser(params)
   .then(data => {
    //  console.log('recieved data \n',data)
      response.body.message= response.body.message + userId
      response.body.input = data
      response.body = JSON.stringify(response.body)
      console.log("response ", response)
      
      return callback(null, response)
   })
};