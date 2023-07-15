import React, { useEffect, useState } from "react";
import styles from "../components/HomePage.module.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

export const HomePage = () => {
  const [news, setNews] = useState([]);
  const [searchnews, setsearchNews] = useState([]);
  const [topic, setTopic] = useState("");

  const handleClick = () => {
    if (topic !== "") {
      const api = `https://newsapi.org/v2/everything?q=${topic}&from=2023-07-11&sortBy=popularity&apiKey=680fdb2b7b284742ae6299b7054b7db3`;
      axios
        .get(api)
        .then((res) => {
          console.log(res);
          setsearchNews(res.data.articles);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=in&apiKey=680fdb2b7b284742ae6299b7054b7db3"
      )
      .then((res) => {
        // console.log(res);
        setNews(res.data.articles);
      });
  }, []);
  return (
    <>
      <div className={`${styles.navbar}`}>
        <div className={`${styles.navlinks}`}>
          <span
            className={`${styles.link}`}
            onClick={() => setTopic("bitcoin")}
          >
            Bitcoin
          </span>
          <span className={`${styles.link}`} 
          onClick={() => setTopic("sports")}>
            Sports
          </span>
          <span
            className={`${styles.link}`}
            onClick={() => setTopic("ecommerce")}
          >
            Ecommerce
          </span>
        </div>
        <div className={`${styles.searchbar}`}>
          <input
            type="text"
            placeholder="Search to Explore more!"
            onChange={(e) => setTopic(e.target.value)}
            className={`${styles.input}`}
          />
          <button onClick={handleClick} className={`${styles.searchbtn}`}>
            <FaSearch />
          </button>
        </div>
      </div>
      <div>
        <h1 className={`${styles.header}`}>Hello Aravind! Your briefing</h1>
      </div>
      <section className={`${styles.newscontainer}`}>
        {(searchnews.length != 0 ? searchnews : news)
          .slice(0, 25)
          .map((newsitem, index) => {
            const {
              title,
              url,
              urlToImage,
            } = newsitem;
            return (
              <article key={index}>
                {urlToImage ? (
                  <img
                    src={urlToImage}
                    alt="Dynamic Image"
                    className={`${styles.image}`}
                  />
                ) : (
                  <img
                    src="/images/noimage.png"
                    alt="Default Image"
                    className={`${styles.image}`}
                  />
                )}
                <div className={styles.info}>
                  <h2>
                    {" "}
                    {title != null ? title.slice(0, 150) + "..." : title}
                  </h2>
                  {/* <p>{description!=null?description.slice(0,200)+"...":description}</p> */}
                  <a href={url} className={`${styles.view}`}>
                    View More
                  </a>
                </div>
              </article>
            );
          })}
      </section>
    </>
  );
};
