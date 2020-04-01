import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './stylesheets/index.css';
import App from './components/App';
// import Home from './components/Home';
// import Admin from './components/Admin';
// import Game from './components/Game';
import * as serviceWorker from './serviceWorker';

// function Container() {
//   return (
//     <Router>
//       <App>
//         <Switch>
//           <Route path="/create" component={Admin} />
//           <Route path="/:gameid" component={Game} />
//           <Route exact path="/" component={Home} />
//         </Switch>
//       </App>
//     </Router>
//   );
// }

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
