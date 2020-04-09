import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AddQn from '../pages/Add';
import Question from '../pages/Question';
import LeaderBoard from '../pages/LeaderBoard';
import NotFound from '../pages/NotFound';

const Main = () =>{
    return (
        <main className="content main bg-white py-5 px-4" id="main">
            <div className="content-inner">
                <div className="row">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/add' component={AddQn} />
                        <Route path='/question/:id' component={Question} />
                        <Route path='/leaderboard' component={LeaderBoard} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </main>
    );
}
export default Main;