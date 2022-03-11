
import Article from "../models/Article";
import ArticleValuesChange from "../services/ArticleValuesChange";

class ItemsController {
    async index(req, res) {
        try {
            const { page, itemsQuantity } = req.params;

            if (!page) { return res.status(404).send() } 

            const currentPage = parseInt(page)

            if (Number.isFinite(currentPage)) {
                if (currentPage == 0) {
                    const article = await Article.find().limit(itemsQuantity);
                    return res.json(article)
                } else {
                    const pageNumber = currentPage * itemsQuantity;
                    const article = await Article.find().limit(pageNumber).skip(pageNumber);
                    return res.json(article)
                }
            } else {
                console.log('/articles/:page/:quantity   the page needs to be a number')
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
            const article = await Article.findById(id);
            
            if(!article) {
                return res.status(404).json({message:"Artigo não encontrado!"})
            }

            ArticleValuesChange.ViewCount(article)
            return res.json(article)

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }

    async like(req, res) {
        try {
            const { id } = req.params;
            const article = await Article.findById(id);

            if(!article) {
                return res.status(404).json({message:"Artigo não encontrado!"})
            }
            
            ArticleValuesChange.likeCount(article)

            return res.status(200).json({ article })

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }


// ---------------------------------------------------------------------------------------------------


    async create(req, res) {
        try {
            
            const { title, date, description, content, url_image } = req.body;
            const likes = 0;
            const views = 0;

            const newArticle = await Article.create({ title, date, description, content, url_image, likes, views })
            console.log(newArticle.content)

            return res.status(200).json(newArticle);
        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }


// ---------------------------------------------------------------------------------------------------


    async update(req, res) {
        try {
            
            const { content, user_id, likes, views } = req.body;

            const { id } = req.params;
            const article = await Article.findOne({ id });
            
            await article.updateOne({ content, user_id })

            return res.status(200).json({message:"Alterado com sucesso!"});

        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }


// ---------------------------------------------------------------------------------------------------


    async destroy(req, res) {
        try {
            const { id } = req.params;
            const article = await Article.findById(id)
            if(!article) {
                return res.status(404).json({message:"Produto não encontrado!"})
            }
            await article.deleteOne();
            return res.status(200).json({message:"Excluído com sucesso!"});
        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Erro de servidor, tente novamente mais tarde!"})
        }
    }
}
export default new ItemsController();