import Routes from './Routes'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import './Asset.css'

function App() {
  return (
    <div className="App">
      <div className="parent">
        <Router>
          <div className="sidenav">
            <nav className="navbar">
              {Routes.map((route, key) => 
                <NavLink 
                  className="navlink" 
                  activeClassName="active" 
                  key={ key } 
                  exact={ route.isExact } 
                  to={ route.route }>
                    { route.name }
                </NavLink>
              )}
            </nav>
          </div>
          <div className="page">
            <Switch>
              {Routes.map((route, key) => 
                <Route
                  path={ route.route }
                  exact={ route.isExact }
                  key={ key }
                  component={ route.component }
                />
              )}
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
