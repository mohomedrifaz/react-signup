import React from 'react';
import ReactDOM from 'react-dom';
import SetupContainer from './components/SetupContainer/SetupContainer';
import './styles/styles.css';
import Sidebar from './components/Sidebar/Sidebar';
import Password from './components/Password/Password';
import ChangeEmail from './components/changeEmail/ChangeEmail';
import PaymentGateway from './components/PaymentGateway/PaymentGateway';
import SelectPlan from './components/SelectPlan/SelectPlan';
import ConfigPcTeam from './components/ComputerConfig/ConfigPcTeam';
import ConfigPcIndividual from './components/ComputerConfig/ConfigPcIndividual';

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
            {/* <ConfigPcIndividual /> */}
            {/* {<ConfigPcTeam />} */}
        </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
