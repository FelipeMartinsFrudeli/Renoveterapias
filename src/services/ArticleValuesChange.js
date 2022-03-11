
class ArticleValuesChange {
    async likeCount(article) {
        try {
            const likes = parseInt(article.likes) + 1;
            await article.updateOne({ likes });
            return true;
        } catch (err) {
            console.error(err)
            return res.status(500)
        }
    }

    async ViewCount(article) {
        try {
            const views = parseInt(article.views) + 1;
            await article.updateOne({ views });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}

export default new ArticleValuesChange();