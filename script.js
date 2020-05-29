const apiKey = config.API_KEY;

// const apiKey = 'tVyWTu6Q0fSFXOlkmujYm8DRdJLtIZtV';

// console.log(process.env);
const news = document.getElementById('news');
const newsLeft = document.getElementById('news-col-left');
const newsMiddle = document.getElementById('news-col-middle');
const newsRight = document.getElementById('news-col-right');
const latest = document.getElementById('latest');
const populars = document.getElementById('populars');

const generateContent = (targetElement, article) => {
  const imgPath = 'http://www.nytimes.com/';
  //articles.forEach(article => {
  targetElement.innerHTML += article.multimedia[0]
    ? `
        <article>
            <a href=${article.web_url} target="_blank">
                <h4>${article.section_name}</h4>
                <img src=${imgPath}${article.multimedia[0].url}>
                <h2>${article.headline.main}</h2>
                <p>${article.abstract}</p>
                <div class="time">${getTime(article.pub_date)}</div>
            </a>
            
        </article>
        `
    : `<article>
        <a href=${article.web_url} target="_blank">
            <h4>${article.section_name}</h4>
            <h2>${article.headline.main}</h2>
            <p>${article.abstract}</p>
            <div class="time">${getTime(article.pub_date)}</div>
        </a>
        
    </article>`;

  //});
};

function getTime(pub_date) {
  const date1 = new Date();
  const date2 = new Date(pub_date);
  if (date1.getFullYear() - date2.getFullYear()) {
    const unit =
      date1.getFullYear() - date2.getFullYear() == 1 ? 'year' : 'years';
    return date1.getFullYear() - date2.getFullYear() + unit + ' ago';
  } else if (date1.getMonth() - date2.getMonth()) {
    const unit = date1.getMonth() - date2.getMonth() == 1 ? 'month' : 'months';
    return date1.getMonth() - date2.getMonth() + unit + ' ago';
  } else if (date1.getDate() - date2.getDate()) {
    const unit = date1.getDate() - date2.getDate() == 1 ? 'day' : 'days';
    return date1.getDate() - date2.getDate() + unit + ' ago';
  } else if (date1.getHours() - date2.getHours()) {
    const unit = date1.getHours() - date2.getHours() == 1 ? 'hr' : 'hrs';
    return date1.getHours() - date2.getHours() + unit + ' ago';
  } else if (date1.getMinutes() - date2.getMinutes()) {
    const unit = date1.getMinutes() - date2.getMinutes() == 1 ? 'min' : 'mins';
    return date1.getMinutes() - date2.getMinutes() + unit + ' ago';
  } else if (date1.getSeconds() - date2.getSeconds()) {
    return date1.getSeconds() - date2.getSeconds() + 'seconds ago';
  } else {
    return 'Posted just now';
  }
}

fetch(
  `https://api.nytimes.com/svc/search/v2/articlesearch.json?facet_fields=type_of_material&fq=News&q=coronavirus&sort=newest&api-key=${apiKey}`
)
  .then((res) => res.json())
  .then((data) => {
    let articles = data.response.docs;
    const imgPath = 'http://www.nytimes.com/';
    console.log(articles);
    //generateContent(articles);
    articles.forEach((article, index) => {
      console.log(index);

      if (index < 3) {
        generateContent(newsMiddle, article);
      } else if (index >= 3 && index < 6) {
        generateContent(newsLeft, article);
      } else if (index >= 6 && index < 9) {
        generateContent(newsRight, article);
      }
    });
  })
  .catch((err) => console.log(err));

const getLatest = () => {
  fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?facet_fields=type_of_material&fq=Article&sort=newest&api-key=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      let articles = data.response.docs;
      console.log(articles);
      const imgPath = 'http://www.nytimes.com/';
      articles.forEach((article) => {
        if (
          article.multimedia &&
          article.multimedia[0] &&
          article.multimedia[0].url
        ) {
          latest.innerHTML += `<article>
                    <a href="${article.web_url}">
                    
                     <img src=${imgPath}${article.multimedia[0].url}>
                     
                     <h2>${article.headline.main}</h2>
                    </a>
                 </article>`;
        }
      });
    })
    .catch((err) => console.log(err));
};

getLatest();

const getMostPopular = () => {
  fetch(
    `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?&api-key=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      let topFivePop = [];
      popular = data.results;
      popular.forEach((pop, index) => {
        if (pop.media && pop.media[0] && topFivePop.length < 5) {
          topFivePop.push(pop);
          let imgUrl = pop.media[0]['media-metadata'][1].url;
          populars.innerHTML += `
                     <article>
                         <a href=${pop.url}>
                             <h2 class="popularTitle">${pop.title}</h2>
                             <div>
                             <img src=${imgUrl}>
                             </div>
                         </a>
                     </article>
                 `;
        }

        let popularTitles = document.querySelectorAll('#populars a');
        popularTitles.forEach((title, index) => {
          title.setAttribute('rank', index + 1);
        });

        // for(let i = 0; i < topFivePop.length; i++) {
        //     let popularTitle = document.querySelectorAll()
        // }
        // topFivePop.forEach( (pop, index) => {
        //     let popularTitle = document.getElementById('popularTitle');
        //      popularTitle.setAttribute('rank', index);
        //      console.log(popularTitle)
        // })
      });
    })
    .catch((err) => console.log(err));
};

getMostPopular();

//control nav bar
window.addEventListener('scroll', () => {
  if (scrollY > 100) {
    document.querySelector('nav').classList.add('fixednav');
  } else {
    document.querySelector('nav').classList.remove('fixednav');
  }
});

//loading icon before 3 fetch
setTimeout(() => {
  document.getElementById('loadingIcon').style.display = 'none';
  document.getElementById('loadingIcon').style.opacity = 0;
}, 2000);
