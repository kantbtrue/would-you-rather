import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar'
import { handleInitialData } from './actions/shared';
import { setAuthedUser } from './actions/authedUser';
import Header from './modules/Header';
import Login from './modules/Login';
import Main from './modules/Main';


class App extends React.Component {

  componentDidMount () {
    this.props.dispatch(handleInitialData());
  };

  handleAuthedUser = (authedUser) => {
    this.props.dispatch(setAuthedUser(authedUser))
  }
  
  render () {
    return (
      <Router>
      <div className="wrapper">
        <LoadingBar />
        <div className="wrapper-inner mx-auto py-5">
              <div className="row">
                  <div className="col-10 mx-auto p-0">
                      {this.props.isLogged
                      ? (
                        <React.Fragment>
                          <Header />
                          <Main />
                        </React.Fragment>
                      )
                      : (
                        <Login handleAuthedUser={this.handleAuthedUser} />
                      )
                      }
                  </div>
              </div>
        </div>
      </div>
      </Router>
    );
  }
}

function mapStateToProps ({authedUser}) {
  return {
    isLogged: authedUser ? true : false
  }
}


export default connect(mapStateToProps)(App);
