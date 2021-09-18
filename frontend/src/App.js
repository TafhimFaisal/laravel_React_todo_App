import { 
  BrowserRouter,
  Route,
  Switch,
  Link 
} from 'react-router-dom';
import Logout from './components/Logout';
import NavBar from './components/NavBar';
import Edit from './pages/Edit';
import List from './pages/List';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <ul className="nav container">
          <li className="nav-item">
            <Link to="/" className="nav-link" href="#">Todo List</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link" href="#">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link" href="#">SignUp</Link>
          </li>
        </ul> */}
        <NavBar />
        <Switch>
          <Route exact path="/" component={List} ></Route>
          <Route exact path="/todo/:id" component={Edit} ></Route>
          <Route path="/login" component={Login} ></Route>
          <Route path="/logout" component={Logout} ></Route>
          <Route path="/SignUp" component={SignUp} ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
