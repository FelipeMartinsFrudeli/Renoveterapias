import Admin from "../models/Admin";

export default async (req, res, next) => {
    const admin = Admin.findOne({_id:req.query.myId})
    if (admin) {
        return next()
    } else {
        return res.status(401).json();
    }
}