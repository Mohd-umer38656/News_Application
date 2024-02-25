// document.body.style.background = "black"
const ApiKey = "b5f7d507103949f1bbb062716ed8770f";

const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>{
    fetchNews("International");
})

async function fetchNews(query){
    const response = await fetch(`${URL}${query}&apiKey=${ApiKey}`) 
    const data =  await response.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = "";

    articles.forEach((articles) => {
        if(!articles.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,articles)
        cardsContainer.appendChild(cardClone);
    });
}  


function fillDataInCard(cardClone,articles){
    const newsTitle = cardClone.querySelector('#new-title')
    const newsImg = cardClone.querySelector('#news-img');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');


    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML = articles.title;
    newsDesc.innerHTML = articles.description;

    const date = new Date(articles.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    }); 

    newsSource.innerHTML = `${articles.source.name} • ${date}`;
    cardClone.firstElementChild.addEventListener('click',()=> {
        window.open(articles.url, "_blank");
    })
}

let currSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedNav?.classList.remove("active");
    currSelectedNav =   navItem;
    currSelectedNav.classList.add("active");
}

const searchBtn = document.getElementById('search-btn');
const searchText = document.getElementById('search-txt');

searchBtn.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = null;
})
function reload(){
    window.location.reload();
}