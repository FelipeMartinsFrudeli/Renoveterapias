
import Comments from "../models/Comments";

class ItemsController {
    async index(req, res) {
        try {
            
            const { page, itemsQuantity } = req.params;

            if (!page) { return res.status(404) } 

            const currentPage = parseInt(page)

            if (Number.isFinite(currentPage)) {
                if (currentPage == 0) {
                    const comments = await Comments.find().limit(itemsQuantity);
                    return res.json(comments)
                } else {
                    const pageNumber = currentPage * itemsQuantity;
                    const comments = await Comments.find().limit(pageNumber).skip(pageNumber);
                    return res.json(comments)
                }
            } else {
                console.log('/products/:page   the page needs to be a number')
                return res.status(404).json({message:"Esta pagina de produtos, não existe!"})
            }

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }

    async show(req, res) {
        try {

            const { id } = req.params;
            const product = await Products.findById(id);
            
            if(!product) {
                return res.status(404).json({message:"Comentário não encontrado!"})
            }

            return res.json(product)

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }

    async create(req, res) {
        try {
            
            const { content, user_id, product_id, likes, dislikes } = req.body;
            
            const newComment = await Products.create({ 
                content, user_id, product_id, likes, dislikes
            })

            return res.status(200).json(newComment);

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }

    async update(req, res) {
        try {
            
            const { content, user_id, product_id, likes, dislikes } = req.body;

            const { id } = req.params;
            const product = await Products.findOne({ id });

            if (product) {
                return res
                    .status(422)
                    .json({ message: `O produto com o nome: ${name} já existe!` })
            }
            
            const newProduct = await Products.updateOne({ content, likes, dislikes })

            return res.status(200).json({message:"Alterado com sucesso!"});

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }

    async destroy(req, res) {
        try {
            
            const { id } = req.params;
            const product = await Products.findById(id)

            if(!product) {
                return res.status(404).json({message:"Produto não encontrado!"})
            }

            await product.deleteOne();

            return res.status(200).json({message:"Excluído com sucesso!"});

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }
}
export default new ItemsController();