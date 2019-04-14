import React, { Component } from 'react';
import Select from 'react-select';
import './App.css';

class App extends Component {
  state = {
    response: [],
    movies: [],
    selectedOption: null,
    movieOption: null
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callMovies()
      .then(res => this.setState({ movies: res }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    let text = 'Loading Characters'
    let time = setInterval(myTimer, 500);
    function myTimer() {
      text += '.'
      document.getElementsByClassName('css-1492t68')[0].innerHTML = text;
    }
    const response = await fetch('/api/people');
    const body = await response.json();
    if(body) clearInterval(time);
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  callMovies = async () => {
    let text = 'Loading Flims'
    let time = setInterval(myTimer, 500);
    function myTimer() {
      text += '.'
      document.getElementsByClassName('css-1492t68')[1].innerHTML = text;
    }
    const response = await fetch('/api/films');
    const body = await response.json();
    if(body) clearInterval(time);
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    let a = document.getElementsByClassName('detail')
    a[0].classList.add('hide');
  }
  handleMovieChange = (moviesOption) => {
    this.setState({ moviesOption });
    // let a = document.getElementsByClassName('detail')
    // a[0].classList.add('hide');
  }
  handleClick = () => {
    let a = document.getElementsByClassName('detail')
    a[0].classList.remove('hide');
    // compose narrative
    const rehearsal = `${this.state.selectedOption.value.name} is gender ${this.state.selectedOption.value.gender === 'n/a' ? 'unknown' : this.state.selectedOption.value.gender} height ${this.state.selectedOption.value.height === 'n/a' ? 'unknown' : this.state.selectedOption.value.height} cm weight ${this.state.selectedOption.value.mass === 'n/a' ? 'unknown' : this.state.selectedOption.value.mass} kilogram with a ${this.state.selectedOption.value.hair_color === 'n/a' ? 'unknown' : this.state.selectedOption.value.hair_color.split(',').join(' and ')} hair color with a ${this.state.selectedOption.value.skin_color === 'n/a' ? 'unknown' : this.state.selectedOption.value.skin_color.split(',').join(' and ')} skin color with a ${this.state.selectedOption.value.eye_color === 'n/a' ? 'unknown' : this.state.selectedOption.value.eye_color} eye color and the birth year ${this.state.selectedOption.value.birth_year === 'n/a' ? 'unknown' : this.state.selectedOption.value.birth_year}`
    let msg = new SpeechSynthesisUtterance(rehearsal);
    window.speechSynthesis.speak(msg);
  }
  aClick = () => {
    let a = document.getElementsByClassName('characters')
    let b = document.getElementsByClassName('films')
    let alink = document.getElementsByClassName('a-link')
    let blink = document.getElementsByClassName('b-link')
    a[0].classList.remove('hide');
    b[0].classList.add('hide');
    alink[0].classList.remove('noline')
    blink[0].classList.add('noline')
  }
  bClick = () => {
    let a = document.getElementsByClassName('characters')
    let b = document.getElementsByClassName('films')
    let alink = document.getElementsByClassName('a-link')
    let blink = document.getElementsByClassName('b-link')
    a[0].classList.add('hide');
    b[0].classList.remove('hide');
    alink[0].classList.add('noline')
    blink[0].classList.remove('noline')
  }

render() {
    return (
      <div className="App">
        <header className="App-header">
          Star War API:
          <a
            className="a-link"
            href="/#"
            target="_self"
            rel="noopener noreferrer"
            onClick={this.aClick}
          >
            Characters
          </a>
          <a
            className="b-link noline"
            href="/#"
            target="_self"
            rel="noopener noreferrer"
            onClick={this.bClick}
          >
            Flims
          </a>
        </header>
        <div className="contents">
        <div className="characters">
        <Select
            value={this.state.response[0] ? '' : 'Loading...'}
            onChange={this.handleChange}
            options=  {this.state.response[0] ? this.state.response.reduce((acu, cur) => {
              acu.push({value: {name:`${cur.name}`, height:`${cur.height}`, mass:`${cur.mass}`, hair_color:`${cur.hair_color}`, skin_color:`${cur.skin_color}`, eye_color:`${cur.eye_color}`, birth_year:`${cur.birth_year}`, gender:`${cur.gender}`}, label:`${cur.name}`})
              return acu
            }, []) : []}
            placeholder={this.state.response[0] ? 'Ready to select!! or type to search' : '' }
          />
        <p>{this.state.selectedOption ? <button onClick={this.handleClick}>{this.state.selectedOption.value.name}</button> : 'Nothing Selected'}</p>
        {this.state.selectedOption ? 
          <div className="detail hide"><p> {`height: ${this.state.selectedOption.value.height} cm`}</p><p>
          {`mass: ${this.state.selectedOption.value.mass} kilogram`}</p><p> {`hair color: ${this.state.selectedOption.value.hair_color}`}</p><p> {`skin color: ${this.state.selectedOption.value.skin_color}`}</p><p> {`eye color: ${this.state.selectedOption.value.eye_color}`}</p><p> {`birth year: ${this.state.selectedOption.value.birth_year}`}</p><p> {`gender: ${this.state.selectedOption.value.gender}`}</p></div> : <div className="detail"></div>}
          </div>

          <div className="films hide">
        <Select
            value={this.state.movies[0] ? '' : 'Loading...'}
            onChange={this.handleMovieChange}
            options=  {this.state.movies[0] ? this.state.movies.reduce((acu, cur) => {
              acu.push({value: {title:`${cur.title}`, episode_id:`${cur.episode_id}`, opening_crawl:`${cur.opening_crawl}`, director:`${cur.director}`, producer:`${cur.producer}`, release_date:`${cur.release_date}`}, label:`${cur.title}`})
              return acu
            }, []) : []}
            placeholder={this.state.movies[0] ? 'Ready to select!! or type to search' : '' }
          />
        {/* <p>{this.state.movieOption ? <button onClick={this.handleClick}>{this.state.movieOption.value.name}</button> : 'Nothing Selected'}</p> */}
        {/* {this.state.movieOption ? 
          <div className="detail hide"><p> {`height: ${this.state.selectedOption.value.height} cm`}</p><p>
          {`mass: ${this.state.selectedOption.value.mass} kilogram`}</p><p> {`hair color: ${this.state.selectedOption.value.hair_color}`}</p><p> {`skin color: ${this.state.selectedOption.value.skin_color}`}</p><p> {`eye color: ${this.state.selectedOption.value.eye_color}`}</p><p> {`birth year: ${this.state.selectedOption.value.birth_year}`}</p><p> {`gender: ${this.state.selectedOption.value.gender}`}</p></div> : <div className="detail"></div>} */}
          </div>
          </div>
      </div>
    );
  }
}
export default App;
