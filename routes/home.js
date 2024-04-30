const express = require('express');
const app = express.Router();
const home = require("../app/controller/home.js");


/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Logs in a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: User's username.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: otp
 *         description: User's otp.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *       400:
 *         description: Invalid request
 * 
 * 
 */

app.post('/login', home.home);
app.post('/signup',home.signup);
module.exports = router;