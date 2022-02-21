
import Products from "../models/Products";

class ItemsController {
    async index(req, res) {
        try {
            
            const { page, itemsQuantity } = req.params;

            if (!page) { return res.status(404) } 

            const currentPage = parseInt(page)

            if (Number.isFinite(currentPage)) {
                if (currentPage == 0) {
                    const products = await Products.find().limit(itemsQuantity);
                    return res.json(products)
                } else {
                    const pageNumber = currentPage * itemsQuantity;
                    const products = await Products.find().limit(pageNumber).skip(pageNumber);
                    return res.json(products)
                }
            } else {
                console.log('/products/:page/:itemsQuantity   the page needs to be a number')
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
                return res.status(404).json({message:"Produto não encontrado!"})
            }

            return res.json(product)

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }

    async total(req, res) {
        try {

            const { id } = req.params;
            const product = await Products.count();
            
            if(!product) {
                return res.status(404).json({message:"Nenhuma tabela foi encontrada!"})
            }

            return res.json(product)

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }

    async create(req, res) {
        try {
            
            const { name, details, description, Tags, category, url_image, price } = req.body;

            const product = await Products.findOne({ name });

            if (product) {
                return res
                    .status(422)
                    .json({ message: `O produto com o nome: ${name} já existe!` })
            }
            
            const newProduct = await Products.create({ 
                name, details, description, Tags, category, url_image, price
            })

            return res.status(200).json(newProduct);

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }

    async update(req, res) {
        try {
            
            const { name, details, description, Tags, category, url_image, price } = req.body;

            const product = await Products.findOne({ name });

            if (!product) {
                return res
                    .status(422)
                    .json({ message: `O produto com o nome: ${name} não existe!` })
            }
            
            await Products.updateOne({ 
                name, details, description, Tags, category, url_image, price
            })

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