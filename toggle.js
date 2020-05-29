//Elements for toggle menu
const toggleMenuBtn = document.getElementById('toggle-menu');
const menu = document.getElementById('menu');
const headerElement = document.querySelector('header');
const closeBtnElement = document.getElementById('closeBtn');

//Elements for toggle search box
const searchIconElement = document.getElementById('searchIcon');
const searchBoxElement = document.getElementById('searchBox');

//Elements for search in search box
const searchInputElement = document.getElementById('searchInput');
const submitInputBtn = document.getElementById('submitInput');
const resultsContainer = document.getElementById('searchResult');

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

function detectTablet() {
    const toMatch = [
        /webOS/i,
        /iPad/i,
        /BlackBerry/i,
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}


toggleMenuBtn.addEventListener('click', () => {
    menu.classList.toggle("showMenu");
    if (detectMob()) {
        let headerHeight = headerElement.offsetHeight - 1;
        menu.style.top = headerHeight + 'px';
        console.log(headerHeight)
        console.log('he')
    } else {
        menu.style.top = 0;
    }
    if (searchBoxElement.classList.contains('showSearch')) {
        searchBoxElement.classList.remove('showSearch');
    }
    // if (detectTablet()) {
    //     closeBtnElement.style.display = 'block';
    // } else {
    //     closeBtnElement.style.display = 'none';
    // }
    
})

closeBtnElement.addEventListener('click', () =>{
    if (menu.classList.contains('showMenu')) {
        menu.classList.remove('showMenu');
    } 
})

window.addEventListener('mousemove', (e)=> {
    let x = e.clientX;
    let y = e.clientY;
    let menuWidth = menu.offsetWidth;
    if (x > menuWidth && menu.classList.contains('showMenu')) {
        setTimeout(()=>{
            menu.classList.remove('showMenu');
        },500)
        
    }
})

window.addEventListener('scroll', () => {
    if(scrollY > 30 && menu.classList.contains('showMenu')) {
        menu.classList.remove('showMenu');
    } else if (scrollY > 200 && searchBoxElement.classList.contains('showSearch')) {
        searchBoxElement.classList.remove('showSearch');
    }
})

// Toggle searchbox
searchIconElement.addEventListener('click', () => {
    searchBoxElement.classList.toggle('showSearch');
    searchInputElement.focus();
    let headerHeight = headerElement.offsetHeight;
        searchBoxElement.style.top = headerHeight + 'px';
    while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }
    if (menu.classList.contains('showMenu')) {
        menu.classList.remove('showMenu');
    } 
    
})



// event triggers when submitInput button is pressed
submitInputBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (searchInputElement.value == undefined || searchInputElement.value == '') {
        return 
    } else {
        console.log(searchInputElement.value)
        getSearchResult(searchInputElement.value);
    }
    searchInputElement.value = '';
})

async function getSearchResult(userInput) {
    try {
        const apiKey = 'tVyWTu6Q0fSFXOlkmujYm8DRdJLtIZtV';
        res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?facet=true&q=${userInput}&api-key=${apiKey}`);
        data = await res.json();
        //console.log(data)
        searchResults = data.response.docs;
        console.log(searchResults)
        insertSearchResults(searchResults);
    }
    catch (err){
        console.log(err)
    }
}

function insertSearchResults(results) {
    while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }
    results.forEach(result => {
        let publishTime = result.pub_date.slice(0, 10);
        resultsContainer.innerHTML += `<article>
                                        <a href="${result.web_url}">
                                            <h3>${result.headline.main}</h3>
                                            <div>${publishTime}</div>
                                        </a>
                                        </article>`;
    })
    
}