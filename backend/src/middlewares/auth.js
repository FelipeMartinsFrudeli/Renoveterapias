import jwt from "jsonwebtoken";
import { promisify } from "util";

import authConfig from "../config/auth";

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({message:"O token é inválido!"});
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        if (req.query.myId === decoded.id) {
            return next()
        } else {
            return res.status(401).json();
        }
    } catch (err) {
        console.log(err)
        return res.status(401).json();
    }
}