import React from 'react';
import ReactDOM from 'react-dom';
import SetupContainer from './components/Setup_Container';
import './styles/styles.css';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div className="container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main">
            <SetupContainer />
        </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
