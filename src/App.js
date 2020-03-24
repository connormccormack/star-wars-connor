import  React, { useState } from 'react';

import './App.css';

// create component with search form

// create event handler for submitting search form

// make a GET request to api

// display results beneath search form

const Form = (props) => {
  const [searchValue, setSearchValue] = useState('');



  const updateSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <form >
      <label>Search
        <input value={searchValue} onChange={updateSearchValue} required placeholder="Character Name"/> 
      </label>
      <button onClick={props.onSubmit} type="submit">Search</button>
    </form>
  )
}

const Results = (props) => {
  const { results } = props;
  return (
    <ul>
      {results && results.map(result => <li>
          {result.name}
        </li>)}
    </ul>
  )
}

const BASE_URL = `https://swapi.co/api/people/`


function App() {
  const [results, setResults] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const handleOnSubmit = (event) => {
    console.log('handleOnSumbit called!')
    // get event value (event.target.value)
    const starWarsName = event.target.value;
    // submit to api
    setErrorMessage('');
    fetch(`${BASE_URL}?name=${starWarsName}`)
      .then(res => {if (res.ok) {
        return res.json();
      }})
      .then(
        (results) => {
          setResults(results)
        }
      )
      .catch(error => {
        setErrorMessage('Something Broke')
      })
    // store results in results variable (using setResults)

  }
  return (
    <div className="App">
      <header className="App-header">
      {errorMessage && <div id="error-container">{errorMessage}</div>}
      <Form onSubmit={() => handleOnSubmit}/> 
      <Results results={results}/>
      </header>
    </div>
  );
}

export default App;
