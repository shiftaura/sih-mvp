const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const login =  async (req, res) => {
    const { email, password } = req.body;
    if(email==""|| password==""){
        return res.status(400).json({ success: false, error: { code: 400, message: "Email and password are required" } });
    }
    try{
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: { code: 401, message: "User not found" }});
      }
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, error: { code: 401, message: "Invalid password" }});
      }
      const token = jwt.sign({ userId: user.id,role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({
      success: true,
      data: { accessToken: token,"user": {id: user.id,name: user.name,email: user.email,role: user.role,state: user.state,district: user.district
}}});
    }
    catch (error) {
        res.status(500).json({ success: false, error: { code:500,message: error }});
    }

}
module.exports = login;