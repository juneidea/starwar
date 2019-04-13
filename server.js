const express = require('express');
const axios = require('axios')
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const getPeople = async () => {
  let people = []
  for (let i = 1; i < 10; i++) {
    try {
      let page = await axios.get(`https://swapi.co/api/people/?page=${i}`)
      page.data.results.forEach( person => people.push(person))
    } catch (error) {
      console.error(error)
    }
  }
  return people
}

const getPerson = (id) => {
  try {
    return axios.get(`https://swapi.co/api/people/${id}`)
  } catch (error) {
    console.error(error)
  }
}

const searchPerson = async (str) => {
  let person = []
  try {
    let page = await axios.get(`https://swapi.co/api/people/?search=${str}`)
    if (page.data.count < 11) {
      return page.data.results
    } else {
      for (let i = 1; i < Math.ceil(page.data.count / 10); i++) {
        let pages = await axios.get(`https://swapi.co/api/people/?search=${str}&page=${i}`)
        pages.data.results.forEach( p => person.push(p))
      }
      return person
    }
  } catch (error) {
    console.error(error)
  }
}

app.get('/api/people', async (req, res) => {
  const allPeople  = await getPeople()
  res.json(allPeople);
});
app.get('/api/people/:id', async (req, res) => {
  const person  = await getPerson(req.params.id)
  res.json(person.data);
});
app.get('/api/search/:s', async (req, res) => {
  const person  = await searchPerson(req.params.s)
  res.json(person);
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
