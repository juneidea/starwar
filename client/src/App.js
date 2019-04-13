import React, { Component } from 'react';
import Select from 'react-select';
import './App.css';

class App extends Component {
  state = {
    response: [],
    selectedOption: null
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
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
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    let a = document.getElementsByClassName('detail')
    a[0].classList.add('hide');
  }
  handleClick = () => {
    let a = document.getElementsByClassName('detail')
    a[0].classList.remove('hide');
    // compose narrative
    const rehearsal = `${this.state.selectedOption.value.name} is gender ${this.state.selectedOption.value.gender === 'n/a' ? 'unknown' : this.state.selectedOption.value.gender} height ${this.state.selectedOption.value.height === 'n/a' ? 'unknown' : this.state.selectedOption.value.height} cm weight ${this.state.selectedOption.value.mass === 'n/a' ? 'unknown' : this.state.selectedOption.value.mass} kilogram with a ${this.state.selectedOption.value.hair_color === 'n/a' ? 'unknown' : this.state.selectedOption.value.hair_color.split(',').join(' and ')} hair color with a ${this.state.selectedOption.value.skin_color === 'n/a' ? 'unknown' : this.state.selectedOption.value.skin_color.split(',').join(' and ')} skin color with a ${this.state.selectedOption.value.eye_color === 'n/a' ? 'unknown' : this.state.selectedOption.value.eye_color} eye color and the birth year ${this.state.selectedOption.value.birth_year === 'n/a' ? 'unknown' : this.state.selectedOption.value.birth_year}`
    let msg = new SpeechSynthesisUtterance(rehearsal);
    window.speechSynthesis.speak(msg);
  }

render() {
    return (
      <div className="App">
        <header className="App-header">
          Star War API:
          <a
            className="App-link"
            href="/"
            target="_self"
            rel="noopener noreferrer"
          >
            Characters
          </a>
          <a
            className="App-link"
            href="/"
            target="_self"
            rel="noopener noreferrer"
          >
            Flims
          </a>
        </header>
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
    );
  }
}
export default App;
