// step 1 - define the web scraper
const cheerio = require('cheerio')

let stockTicker = 'mrna'
let type = 'history'

async function scraper() {
  try {
    // step a - fecth the page html
    const url = `https://finance.yahoo.com/quote/${stockTicker}/${type}?p=${stockTicker}` //we assign the url 
    const res = await fetch(url) //we fetch all the data from the website 
    const html = await res.text()
    const $ = cheerio.load(html) // this commands the webscraper to give us an easy syntax to find the information that we are looking for 
  } catch(err) {
    console.log(err.message)
  }
}

function getPrices(cher) {
  const prices = cher('td:nth-child(6)').get().map((current_value)=>{}) //this is a way with cheerio to get the 6th child and by adding : we specify that
}

//step 2 - initialize a server that serves up an html file that the user can play with 

// step 3 - define api endpoints to access stock data (and call webscraper)