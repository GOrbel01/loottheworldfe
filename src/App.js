import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import WeaponComponent from './components/item/weapon/WeaponComponent'
import CreateStatComponent from './components/stats/CreateStatComponent';
import CreateItemComponent from './components/item/CreateItemComponent';

import WeaponService from './services/item/weapon/WeaponService';
import ArmorService from './services/item/armor/ArmorService';

function App() {
  return (
    <div>
        <Router>
              <div className="container">
                   <Routes> 
                        <Route path = "/" exact element = {<WeaponComponent></WeaponComponent>}></Route>
                        <Route path = "/items" element = {<WeaponComponent></WeaponComponent>}></Route>
                        <Route path = "/add-stat/:id" element = {<CreateStatComponent></CreateStatComponent>}></Route>
                        <Route path = "/add-weapon/:id" element = {<CreateItemComponent service={WeaponService} itemtype={'weapon'}></CreateItemComponent>}></Route>
                        <Route path = "/add-armor/:id" element = {<CreateItemComponent service={ArmorService} itemtype={'armor'}></CreateItemComponent>}></Route>
                        {/*<Route path = "/view-employee/:id" component = {ViewEmployeeComponent}></Route> */}
                        {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
                  </Routes>
              </div>
        </Router>
    </div>
  );
}

export default App;
