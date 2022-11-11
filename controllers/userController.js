const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

// signup route
exports.registerUser = async (req, res) => {
    if ((req.body.password).length < 6) {
        res.status(422).json({ error: 'Password length is too short, please enter a password longer than 6 characters.' })
    }

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        res.status(409).json({ error: 'User with this email already exists, please use another email or log into your account.' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    // Create an user object
    let user = new User({
        email: req.body.email,
        name: req.body.name,
        password: encryptedPassword,
        user_type_id: req.body.user_type_id
    })

    // Save User in the database
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
            res.status(422).json({ error: 'Unprocessable due to database error found, account with this email may already exist.' })
        } else {
            // create payload then Generate an access token
            let payload = { id: registeredUser._id, user_type_id: req.body.user_type_id || 0 };
            const token = jwt.sign(payload, process.env.SECRET_KEY);
            res.status(200).send({ token })
        }
    })
}

// login route
exports.userLogin = async (req, res) => {
    User.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ error: "Email or Password entered is invalid" });
        } else {
            if (user) {
                const validPass = await bcrypt.compare(req.body.password, user.password);
                if (!validPass) {
                    return res.status(401).json({ error: "Email or Password entered is invalid" });
                }
                // Create and assign token
                let payload = { id: user._id, user_type_id: user.user_type_id };
                const token = jwt.sign(payload, process.env.SECRET_KEY);

                res.status(200).header("auth-token", token).send({ "token": token });
            }
            else {
                res.status(401).json({ error: 'Invalid email entered, no account with entered email exists.' })
            }

        }
    })
}

// function to get user info
exports.getLoggedInUser = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.json({ message: 'No user found' })
        }
        return res.status(200).json({ user: user })
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

// function to get all existing user info
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(404).json({ message: "No users found yet." });
    }
}

// function for logged in user to delete their account
exports.deleteUser = async (req, res) => {
    const user = await User.find();
    User.deleteOne(user, function (err, user) {
        if (err)
            return res.status(400).json({
                message: "Failed to delete user",
            });
        res.status(200).json({
            status: "success",
            message: 'User account successfully deleted'
        });
    });
}
