import React from 'react';
import PollCard from '../components/PollCard';
import { connect } from 'react-redux';

class Home extends React.Component {
    state = {
        toggle: false
    }
    handleToggle = (bool) => {
        this.setState({
            toggle: bool
        });
    }
    render () {
        const toggle = this.state.toggle;
        return (
            <React.Fragment>

                <div className="col-auto mb-4 mx-auto switch-cat text-center">
                    <button className={`btn btn-primary mr-2 ${!toggle && 'active'}`} onClick={() => this.handleToggle(false)}>Unanswered Questions</button>
                    <button className={`btn btn-primary ${toggle && 'active'}`} onClick={() => this.handleToggle(true)}>Answered Questions</button>
                </div>

                {this.state.toggle === false 
                ? this.props.unansweredIds.map(id =>
                    (
                        <div key={id} className="col-6">
                        <PollCard id={id} />
                        </div>
                    ))
                :  this.props.answeredIds.map(id =>
                    (
                        <div key={id} className="col-6">
                        <PollCard id={id} />
                        </div>
                    ))
                }
            </React.Fragment>            
        );
    }
};

function mapStateToProps ({questions, users, authedUser}) {
    return {
        answeredIds: Object.keys(questions).filter(id => (Object.keys(users[authedUser].answers)).includes(id)).sort((a,b)=> questions[b].timestamp - questions[a].timestamp),
        unansweredIds: Object.keys(questions).filter(id => !(Object.keys(users[authedUser].answers)).includes(id)).sort((a,b)=> questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Home);