// step 1 - define the web scraper
const cheerio = require('cheerio')

let stockTicker = 'mrna'
let type = 'history'

async function scraper(ticker) {
  try {
    // step a - fecth the page html
    const url = `https://finance.yahoo.com/quote/${ticker}/${type}?p=${ticker}` //we assign the url 
    const res = await fetch(url) //we fetch all the data from the website 
    const html = await res.text()
    const $ = cheerio.load(html) // this commands the webscraper to give us an easy syntax to find the information that we are looking for 
    const price_history = getPrices($)
    return price_history
    console.log(price_history)
  } catch(err) {
    console.log(err.message)
  }
}

function getPrices(cher) {
  const prices = cher('td:nth-child(6)').get().map((current_value) => {
    return cher(current_value).text()
  })
  return prices 
  //this is a way with cheerio to get the 6th child and by adding : we specify that
}

//step 2 - initialize a server that serves up an html file that the user can play with 
const express = require('express')
const app = express()
const port = 8383

// middleware 

app.use(express.json())
// this allow's to automatically pass the json so that we can destructure the ticker 

//we call it as if it was a function 
app.use(require('cors')()) //enable cross origin request 
app.use(express.static('public')) // this command it's gonna save the html when someone request's

app.listen(port, () => { console.log(`server has started on port: ${port}`) })
// this makes the server listens to our next requests 




// step 3 - define api endpoints to access stock data (and call webscraper)

app.post('/api', async (req,res) => {
  const { stockTicker:ticker } = req.body
  // a post request that contains a ticker 
  
  // this is the body of the request
  console.log(ticker)
  const prices = scraper(ticker)
  res.status(200).send({message:"success"}) //this will send all the prices 
}) // this is how we define an endpoint in express 

// the function has two inputs res and req 