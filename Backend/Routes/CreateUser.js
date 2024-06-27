const express = require('express');
const router = express.Router();
const User = require('../models/user');

const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisharshHelloChannel$#";

router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'incorrect password').isLength({ min: 5 })],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt);
        try {
            if (
                !req.body.name ||
                !req.body.password ||
                !req.body.email ||
                !req.body.location
            ) {
                return response.status(400).send({
                    message: 'Send all required fields: title, author, publishYear',
                });
            }

            const data = {
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            }

            await User.create(data);
            return res.json({ success: true });

        } catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    });

router.post('/loginuser', [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 })], 
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        try {
            let email = req.body.email;

            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ error: "Enter Valid Email" });
            }
            const pwdCompare = bcrypt.compare(req.body.password,userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ error: "Enter Valid Password" });
            }

            const data = {
                user:{
                    id:userData.id
                }
            }

            const authToken = jwt.sign(data,jwtSecret);
            return res.json({ success: true, authToken:authToken });
        } catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    })

module.exports = router;