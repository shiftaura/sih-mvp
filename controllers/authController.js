// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Or 'bcrypt' depending on what you installed
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Auth user & get token
// @route   POST /api/auth/login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        res.status(400);
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    console.log(user);
    // FIX HERE: Use bcrypt.compare directly
    console.log(await bcrypt.compare(password, user.password))
    if (user || (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            data: {
                accessToken: token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    state: user.state,
                    district: user.district
                }
            }
        });
    } else {
        
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// ... rest of your code


// @desc    Get current logged in user
// @route   GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    });
});

module.exports = { login, getMe };
