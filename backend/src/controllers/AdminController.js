import Admin from "../models/Admin";

import { createPasswordHash } from '../services/auth';

class AdminController {

    async show(req, res) {
        try {
            
            const { id } = req.params;
            const admin = await Admin.findById(id);

            if (!admin) {
                return res.status(404).json({message:"Usúario não encontrado!"});
            } 

            return res.json(admin);

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }

    async create(req, res) {
        try {
            
            const { email, password } = req.body;

            const admin = await Admin.findOne({ email });

            if (admin) {
                return res
                    .status(422)
                    .json({ message: `Usuário com o email: ${email} já existe, tente outro email!` })
            }
            
            const encryptedPassword = await createPasswordHash(password)
            
            const newAdmin = await Admin.create({ 
                email, 
                password: encryptedPassword 
            })

            return res.status(200).json(newAdmin);

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }

    async update(req, res) {
        try {
            
            const { id } = req.params;
            const { email, password } = req.body;

            const admin = await Admin.findById(id);
            
            if (!admin) {
                return res.status(404).json({message:"Usúario não encontrado!"});
            } 

            const EmailAlreadyExist = await Admin.findOne({ email });

            if(EmailAlreadyExist) {
                return res.status(422).json({ message: `Usuário com o email: ${email} já existe, tente outro email!` })
            }

            const encryptedPassword = await createPasswordHash(password);

            await admin.updateOne({ email, password: encryptedPassword })

            return res.status(200).json({message:"Alterado com sucesso!"});

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }

    async destroy(req, res) {
        try {
            
            const { id } = req.params;
            const admin = await Admin.findById(id)

            if (!admin) {
                return res.status(404).json({message:"Usúario não encontrado!"});
            }

            await admin.deleteOne();

            return res.status(200).json({message:"Excluído com sucesso!"});

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }
}

export default new AdminController();