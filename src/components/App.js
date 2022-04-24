import Header from './Header';
import AddForm from './AddForm/AddForm';
import SettingPanel from './SettingPanel/SettingPanel';
import ListItems from './ListItems/ListItems';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <AddForm/>
      <div className='line'></div>
      <SettingPanel/>
      <ListItems/>
    </div>
  );
}

export default App;
