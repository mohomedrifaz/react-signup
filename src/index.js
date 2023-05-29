import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';
import './styles/styles.css';

const App = () => {
  return (
    <div className="container">
        <div className="sidebar"></div>
        <div className="main">
            <Container />
        </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
