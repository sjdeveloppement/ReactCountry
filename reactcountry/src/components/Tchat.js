import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import axios from 'axios';
import Article from './Article';


const Tchat = () => {

    const [newsData, setNewsData] = useState([]);
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);

    useEffect(()=> {
        getData();
    }, [])

    const getData= () =>{
        axios.get('http://localhost:3003/articles').then((res) => setNewsData(res.data));
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();

        if(content.length > 200 || !content.match(/^[A-Za-z0-9_!^?àéèîôûïç\s]{3,200}$/) || !author.match(/^[A-Za-z0-9_^éèîôâûïç\s]{2,200}$/)) {
            setError(true);
        }else {

            
            axios.post('http://localhost:3003/articles', {
                author,
                content,
                date: Date.now(),
            }).then(()=>{
                setError(false);
                setAuthor("");
                setContent("");
                getData();
            });
        }
    };

    return (
        <div className="tchat-container">
            <Navigation />
            <Logo />
            <h1>Tchat</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input onChange={(e) => setAuthor(e.target.value)}   type="text" placeholder="Nom" value={author}/>
                <textarea onChange={(e) => setContent(e.target.value)} name="" id="" placeholder="Message" style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}  value={content}></textarea>
                { error && <p>Veuillez écrire maximum 200 caractères valides</p> }
                <input type="submit" value="Envoyer" />
                </form>

                <ul>{newsData
                .sort((a,b) => b.date - a.date) // tri de la date du plus récent au plus lointain
                .map((article)=>(
                    <Article key={article.id} article={article} />
                ))}
                </ul>
        </div>
    );
};

export default Tchat;