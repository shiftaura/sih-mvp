const pool = require('../db'); // Required for database operations

const postProjects = async (req, res) => {
    const { name, type, department, state, district, requiredArea, targetDate } = req.body;
    
    if (!name || !type || !department || !state || !district || !requiredArea || !targetDate) {
        return res.status(400).json({ success: false, error: { code: "BAD_REQUEST", message: "Please provide all the required fields" } });
    }
    
    if (req.user.role !== "centralOfficer" && req.user.role !== "stateOfficer") {
        return res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "You are not authorized to perform this action" } });
    }

    try {
        // Insert into DB and return the newly created row using RETURNING *
        const insertQuery = `
            INSERT INTO projects (name, type, department, state, district, required_area, target_date, status, created_by) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *;
        `;
        
        // Assuming default status is 'pending' or similar
        const values = [name, type, department, state, district, requiredArea, targetDate, 'pending', req.user.id];
        
        const result = await pool.query(insertQuery, values);

        return res.status(201).json({ 
            success: true, 
            data: result.rows[0] 
        });
        
    } catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).json({ 
            success: false, 
            error: { code: "INTERNAL_SERVER_ERROR", message: "Failed to create project" } 
        });
    }
};

module.exports = postProjects;