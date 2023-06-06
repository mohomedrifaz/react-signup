import React from 'react';
import ReactDOM from 'react-dom';
import SetupContainer from './components/SetupContainer';
import './styles/styles.css';
import Sidebar from './components/Sidebar';
import Password from './components/Password';
import ChangeEmail from './components/ChangeEmail';
import PaymentGateway from './components/PaymentGateway';
import SelectPlan from './components/SelectPlan';

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
            {/* <PaymentGateway /> */}
            <SelectPlan />
        </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
