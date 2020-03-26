import React, { useState, useEffect } from 'react';
import ArticlesList from '../components/ArticlesList';
//import NotFoundPage from './NotFoundPage';

const ArticlePage = ({ match }) => {
    const [articleInfo, setArticleInfo] = useState([{
        name: '',
        title: '',
        content: []
    }]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/`);
            const body = await result.json();
            console.log(body);
            setArticleInfo(body);
        };
        fetchData();
    }, [])
    const name = match.params.name;
    const article = articleInfo.find(article => article.name === name);


    console.log(articleInfo)
    // if (!article) return <NotFoundPage />
    if (!article) return <h1>loading</h1>
    const otherArticles = articleInfo.filter(article => article.name !== name);
    return (
        <>
            <h1>{article.title}</h1>
            {article.content.map((paragraf, key) => (
                <p key={key}>{paragraf}</p>
            ))}
            <h3>other article</h3>
            <ArticlesList articles={otherArticles} />
        </>
    );
}

export default ArticlePage;