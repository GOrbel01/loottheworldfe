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
import AuthMenuComponent from './components/general/AuthMenuComponent';
import UnAuthMenuComponent from './components/general/UnAuthMenuComponent';
import HomePage from './components/general/HomePage';
import WeaponService from './services/item/weapon/WeaponService';
import ArmorService from './services/item/armor/ArmorService';
import StatsComponent from './components/stats/StatsComponent';
import LoginRedirect from './components/login/LoginRedirect';
import { useMenuLoginHook } from './components/login/LoginProvider';
import CreateRarityComponent from './components/item/rarity/CreateRarityComponent';
import RarityComponent from './components/item/rarity/RarityComponent';

function App() {
  const { authenticated } = useMenuLoginHook();
  return (
    <div>
        <Router>
          {authenticated ? <AuthMenuComponent /> : <UnAuthMenuComponent />}
              <div className="container">
                   <Routes> 
                        <Route path = "" exact element = {<HomePage></HomePage>}></Route>
                        <Route path = "/" exact element = {<HomePage></HomePage>}></Route>
                        <Route path = "/home" exact element = {<HomePage></HomePage>}></Route>
                        {/* <Route path= "/login" exact element = {<Login authenticated={authenticated}></Login>}></Route> */}
                        {/* <Route path="/login" exact element
                          render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route> */}
                        <Route path = "/items" element = {<ItemComponent></ItemComponent>}></Route>
                        <Route path = "/stats" element = {<StatsComponent></StatsComponent>}></Route>
                        <Route path = "/add-stat/:id" element = {<CreateStatComponent></CreateStatComponent>}></Route>
                        <Route path = "/add-weapon/:id" element = {<CreateItemComponent service={WeaponService} itemtype={'weapon'}></CreateItemComponent>}></Route>
                        <Route path = "/add-armor/:id" element = {<CreateItemComponent service={ArmorService} itemtype={'armor'}></CreateItemComponent>}></Route>
                        <Route path="/oauth2/redirect" element={<LoginRedirect></LoginRedirect>}></Route>  
                        <Route path="/add-loot-rarity/:id" element={<CreateRarityComponent></CreateRarityComponent>}></Route>  
                        <Route path="/loot-rarities" element={<RarityComponent></RarityComponent>}></Route>  
                  </Routes>
              </div>
        </Router>
    </div>
  );
}

export default App;
