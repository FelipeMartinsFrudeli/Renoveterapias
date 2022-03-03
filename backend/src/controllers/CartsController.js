import Cart from "../models/Cart";

class CartsController {
    async index(req, res) {
        try {

            const carts = await Cart.find()
            
            return res.status(200).json(carts)

        } catch (err) {
            console.log(err)
            return res.status(500).json({message:"Ocorreu algum erro no servidor. Tente novamente mais tarde!"})
        }
    }

    async create(req, res) {
        try {

            const { code, price } = req.body;

            const lastCart = await Cart.findOne({code});
            if(lastCart) {
                return res.status(500).json({message:"Este carrinho ja existe!"})
            }

            const cart = await Cart.create({ code, price });

            return res.status(201).json(cart);

        } catch (err) {
            console.log(err)
            return res.status(500).json({message:"Ocorreu algum erro no servidor. Tente novamente mais tarde!"})
        }
    }

    async update(req, res) {
        try {

            const { id } = req.params;
            const { code, price } = req.body;

            const cart = await Cart.findById(id)

            if(!cart) {
                return res.status(404).json({message:"Carrinho não encontrado!"})
            }

            await cart.updateOne({ code, price });

            return res.status(200).json();

        } catch (err) {
            console.log(err)
            return res.status(500).json({message:"Ocorreu algum erro no servidor. Tente novamente mais tarde!"})
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;

            const cart = await Cart.findById(id);

            if(!cart) {
                return res.status(404).json({message:"Carrinho não encontrado!"})
            }

            await cart.deleteOne();

            return res.status(200).json()

        } catch (err) {
            console.log(err)
            return res.status(500).json({message:"Ocorreu algum erro no servidor. Tente novamente mais tarde!"})
        }
    }
}

export default new CartsController();