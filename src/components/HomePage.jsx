import React, { useEffect, useState } from "react";
import styles from "../components/HomePage.module.css";
import axios from "axios";
export const HomePage = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=680fdb2b7b284742ae6299b7054b7db3"
      )
      .then((res) => {
        console.log(res);
        setNews(res.data.articles);
      });
  }, []);
  return (
    <>
    <h1 className={`${styles.header}`}>Hello Aravind!  Your briefing</h1>
      <section className={`${styles.newscontainer}`}>
        {news.map((newsitem, index) => {
          const {
            author,
            content,
            description,
            source,
            publishedAt,
            title,
            url,
            urlToImage,
          } = newsitem;
          return (
            <article key={index} >
              {urlToImage ? (
                <img src={urlToImage} alt="Dynamic Image" className={`${styles.image}`} />
              ) : (
                <img
                  src="/images/noimage.png"
                  alt="Default Image"
                  className={`${styles.image}`}
                />
              )}
              <div className={styles.info}>
                <h2>{author}</h2>
                <p> {title}</p>
                <a href={url} className={`${styles.view}`}>View More</a>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};
