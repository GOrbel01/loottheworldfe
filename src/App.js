import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ItemComponent from './components/item/ItemComponent'
import CreateStatComponent from './components/stats/CreateStatComponent';
import CreateItemComponent from './components/item/CreateItemComponent';
import MenuComponent from './components/general/MenuComponent';
import HomePage from './components/general/HomePage';

import WeaponService from './services/item/weapon/WeaponService';
import ArmorService from './services/item/armor/ArmorService';
import StatsComponent from './components/stats/StatsComponent';

function App() {
  return (
    <div>
        <Router>
          <MenuComponent></MenuComponent>
              <div className="container">
                   <Routes> 
                        <Route path = "" exact element = {<HomePage></HomePage>}></Route>
                        <Route path = "/" exact element = {<HomePage></HomePage>}></Route>
                        <Route path = "/home" exact element = {<HomePage></HomePage>}></Route>
                        <Route path = "/items" element = {<ItemComponent></ItemComponent>}></Route>
                        <Route path = "/stats" element = {<StatsComponent></StatsComponent>}></Route>
                        <Route path = "/add-stat/:id" element = {<CreateStatComponent></CreateStatComponent>}></Route>
                        <Route path = "/add-weapon/:id" element = {<CreateItemComponent service={WeaponService} itemtype={'weapon'}></CreateItemComponent>}></Route>
                        <Route path = "/add-armor/:id" element = {<CreateItemComponent service={ArmorService} itemtype={'armor'}></CreateItemComponent>}></Route>
                  </Routes>
              </div>
        </Router>
    </div>
  );
}

export default App;
