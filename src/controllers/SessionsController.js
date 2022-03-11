import jwt from "jsonwebtoken";

import User from "../models/User"
import { checkPassword } from "../services/auth";

import authConfig from "../config/auth";
import Admin from "../models/Admin";

class SessionController {
    async create(req, res) {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {user = await Admin.findOne({ email });}

        console.log(password)
        if(!user || !checkPassword(user, password)) {
            return res.status(401).json({message:"Usuário ou senha inválidos!"})
        }

        const { id } = user;

        return res.json({
            user: {
                id,
                email
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        });
    }
}

export default new SessionController();