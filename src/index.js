import React from 'react';
import ReactDOM from 'react-dom';
import SetupContainer from './components/SetupContainer/SetupContainer';
import './styles/styles.css';
import Sidebar from './components/Sidebar/Sidebar';
import Password from './components/Password/Password';
import ChangeEmail from './components/changeEmail/ChangeEmail';
import PaymentGateway from './components/PaymentGateway/PaymentGateway';
import SelectPlan from './components/SelectPlan/SelectPlan';
import ConfigPc from './components/ComputerConfig/ConfigPc';

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
            {/* <SelectPlan /> */}
            <ConfigPc />
        </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
