const sectionNews = document.getElementById('sectionNews');
const apiKey = config.API_KEY;

const insertArticlesToSection = (articles) => {
  articles.forEach((article) => {
    const imgPath = 'http://www.nytimes.com/';
    sectionNews.innerHTML += article.multimedia[0]
      ? `
        <article>
            <a href=${article.web_url} target="_blank">
            
                <img src=${imgPath}${article.multimedia[0].url}>
                <h2>${article.headline.main}</h2>
            
            </a>
        </article>
        `
      : `<article>
        <a href=${article.web_url} target="_blank">
            <h2>${article.headline.main}</h2>
        </a>
    </article>`;
  });
};

let page = 0;
const getSectionNews = async (section) => {
  res = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?facet=true&fq=section_name:("${section}")&page=${page}&q=coronavirus&api-key=${apiKey}`
  );
  data = await res.json();
  articles = await data.response.docs;
  console.log(articles);
  page++;
  await insertArticlesToSection(articles);
};
