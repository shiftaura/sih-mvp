const postProjects = async (req, res) => {
    const {name, type,department , state,district,requiredArea,targetDate}=req.body;
    if(!name || !type || !department || !state || !district || !requiredArea || !targetDate){
        return res.status(400).json({success:false,error:{code:"BAD_REQUEST",message:"Please provide all the required fields"}});
    }
    if(req.user.role !== "centralOfficer"&&req.user.role !== "stateOfficer"){
        return res.status(400).json({success:false,error:{code:"FORBIDDEN",message:"You are not authorized to perform this action"}});
    }
    //yaha pe abhi db me insert karna hai and response bhi retuen kana hai
}

module.exports = postProjects;