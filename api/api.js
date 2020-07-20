const express = require("express");
const auth = require("../middleware/auth")

module.exports = function (params) {
  const api = params.api;

  var auth_router = express.Router();
  api.use('/auth' , auth_router);
  const authParams = {
    api : auth_router,
  };
  require('./authentication/authentication_api')(authParams);
  
  var basicapi_router = express.Router();
  api.use('/all' , basicapi_router);
  const basicapiParams = {
    api : basicapi_router,
  };
  require('./basic/basic_api')(basicapiParams);

  api.use(auth)

  var user_router = express.Router();
  api.use('/user' , user_router);
  const userParams = {
    api : user_router
  };
  require('./user/user_api')(userParams);


};
