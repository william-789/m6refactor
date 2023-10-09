import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Tickets from "./pages/Tickets/Tickets";
import Profile from "./pages/Profile/Profile";
import Festival from './pages/Festival/Festival';
import Artist from './pages/Artist/Artist';

import Navbar from "./components/Navbar/Navbar";
import UserProvider from "./context/UserContext";
import Splashscreen from "./components/Splashscreen/Splashscreen";

function App() {

  return (
    <UserProvider>
      <Router location={"/"}>
        <div className="App">
          <Splashscreen />
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/home" component={Home}/>
            <Route path="/search" component={Search} />
            <Route path="/tickets" component={Tickets}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/festival/:id_festival" component={Festival}/>
            <Route path="/artist/:id_artist" component={Artist}/>
            <Redirect to={"/login"}/>
          </Switch>
          <Navbar/>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
