import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Nav from './components/Nav'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Nav />
        <Switch>
          <Route path="/" exact>
            <h1>Home</h1>
          </Route>
          <Route path="/about">
            <h1>About</h1>
          </Route>
          <Route path="/contact">
            <h1>Contact</h1>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
