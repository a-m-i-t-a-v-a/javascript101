// get quotes from api
const quoteContainer=document.getElementById("quote-container");
const quoteText=document.getElementById("quote")
const authorText=document.getElementById("author")
const twitterBtn=document.getElementById("twitter")
const addQuote=document.getElementById("new-quote")
const loader=document.querySelector('.loader')

let apiQuotes=[];

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true
}

//hide loading
function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}

function newQuote(){
    //pick a random quote from API quotes array
    loading()
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    console.log(quote)
    if(!quote.author){
        authorText.textContent='Unknown'
    }else{
        authorText.textContent=quote.author
    }
    if(quote.quote.length>50){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent=quote.quote;
    complete();
}

async function fetchQuotes(){
    loading()
    try{
        const data=await fetch('https://dummyjson.com/quotes')
        const response=await data.json()
        apiQuotes=response.quotes
        newQuote()
    }catch(err){
        alert(err.message)
    }
}

//tweet a quote
function tweetQuote(){
    const twitterURL=`https://twitter.com/intent/tweet?text=
        ${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL,`_blank`)
}

//event listners
addQuote.addEventListener('click',newQuote)
twitterBtn.addEventListener('click',tweetQuote);

fetchQuotes()