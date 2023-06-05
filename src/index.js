import React from 'react';
import ReactDOM from 'react-dom';
import SetupContainer from './components/SetupContainer';
import './styles/styles.css';
import Sidebar from './components/Sidebar';
import Password from './components/Password';
import ChangeEmail from './components/ChangeEmail';
import PaymentGateway from './components/PaymentGateway';

const App = () => {
  
  return (
    <div className="container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main">
            {/* <SetupContainer /> */}
            {/* <Password /> */}
            {/* <ChangeEmail /> */}
            <PaymentGateway />
        </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
