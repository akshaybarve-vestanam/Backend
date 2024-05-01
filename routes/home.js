const express = require("express");
const app = express.Router();
const home = require("../app/controller/home.js");

/**
 * @swagger
 * paths:
 * /login:
 *     post:
 *      tags:
 *        - Authentication
 *      description: Logs in a user
 *     produces:
 *        - application/json
 *      parameters:
 *        - name: username
 *          description: User's username.
 *          in: formData
 *          required: true
 *          type: string
 *        - name: otp
 *          description: User's otp.
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Successful login
 *          schema:
 *            type: object
 *            properties:
 *              success:
 *                type: boolean
 *        400:
 *          description: Invalid request
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *
 *
 * /signup:
 *  post:
 *     tags:
 *       - Authentication
 *     description: Registers a new user
 *    produces:
 *       - application/json
 *    parameters:
 *       - name: username
 *         description : User's username.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: User's email address.
 *         in: formData
 *         required: true
 *         type: string
 *         format: email
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *         format: password
 *     responses:
 *       200:
 *         description: User registered successfully
 *          schema:
 *            type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *       400:
 *         description: Invalid request
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Username already exists
 */

app.post("/login", home.home);
app.post("/signup", home.signup);
module.exports = router;
