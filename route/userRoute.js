'use strict';
const { authSchema } = require('./../models/validate')
let express = require('express')
let routes = express.Router()
let validator = require('express-joi-validation').createValidator({
    passError: true
})
module.exports = function (app) {
    var userHandlers = require('../controllers/Controller.js');
    // todoList Routes
    // app.route('/tasks')
    //     .post(userHandlers.loginRequired, userHandlers.profile);
    app.post('/auth/register', validator.body(authSchema), userHandlers.register)
    //    app.route('/auth/sign_in')
    //         .post(userHandlers.sign_in);
    return app
};