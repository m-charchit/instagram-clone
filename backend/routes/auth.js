const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const fetchUser = require("../middleware/fetchUser")

const JWT_STRING = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

router.post('/register', [
    body('name', "Enter a valid Name").isLength({ min: 5, max: 10 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ errors: "user already Exists" });
            }
            const salt = await bycrypt.genSalt(10);
            const secPass = await bycrypt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const auth_token = jwt.sign(data, JWT_STRING)

            res.json({success:true, auth_token })
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal Server Error")
        }
    })

router.post('/login', [
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password can't be blank").exists(),
],      
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {    
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body
        try {
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ errors: "Incorrect email or password" })
            }
            const passwordCompare = await bycrypt.compare(password, user.password)
            if (!passwordCompare) {
                return res.status(400).json({ errors: "Incorrect email or password" })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const auth_token = jwt.sign(data, JWT_STRING)
            res.json({success:true, auth_token })

        } catch (error) {
            console.log(error)
            res.status(500).send("Internal Server Error")
        }
    })

router.post('/getuser', fetchUser ,async (req, res) => {

        try {
            // @ts-ignore
            const user = await User.findById(req.user.id).select("-password")
            
            res.send(user)
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal Server Error")
        }
    })
    
module.exports = router