import Header from './Header';
import AddForm from './AddForm/AddForm';
import SettingPanel from './SettingPanel/SettingPanel';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <AddForm/>
      <div className='line'></div>
      <SettingPanel/>
    </div>
  );
}

export default App;
