import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleQuestionAnswer } from '../actions/questions';
import { handleUserAnswer } from '../actions/users';

class QuestionCard extends React.Component {

    state = {
        option: ''
    };

    handleChange = (e) => {
        this.setState({
            option: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, authedUser } = this.props;
        dispatch(handleQuestionAnswer({
            authedUser,
            qid: this.props.match.params.id,
            answer: this.state.option
        }));
        dispatch(handleUserAnswer({
            authedUser,
            qid: this.props.match.params.id,
            answer: this.state.option
        }));
    };

    render () {
        const { optionOne, optionTwo } = this.props.question;
        const { authedUser, authedUsername, authedUserImg } = this.props;
        const id = this.props.match.params.id;
        const answered = Object.keys(this.props.users[authedUser].answers).includes(id);
        const answeredVal = answered ? this.props.users[authedUser].answers[id] : '';
        console.log(this.props.users[authedUser], this.props.users[authedUser].answers[id]);
        const votes = {
            total: optionOne.votes.length + optionTwo.votes.length,
            optionOne: optionOne.votes.length,
            optionTwo: optionTwo.votes.length
        };

        const percent = (val, total) => {
            return ((val/total)*100).toFixed(2);
        };

        return (
            <div className="card poll-card rounded border-primary">
                <div className="card-header bg-primary border-0 p-0">
                        <div className="row align-items-center">
                            <div className="col-12">
                                <div className="row align-items-center">
                                    <div className="col-auto px-2">
                                        <img src={authedUserImg} className="poll-card__img rounded-circle" alt=""/>
                                    </div>
                                    <div className="col pl-2 pr-0">
                                        <h3 className="poll-card__author base-plus-font-size text-white font-weight__600">{authedUsername} asks:</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="card-content text-dark">
                    {!answered
                        ? (<React.Fragment>
                                <h2 className="md-font-size">Would you rather</h2>
                                <form className="poll-form" onSubmit={this.handleSubmit}>
                                    <div className="poll-card-form">
                                        <div className="custom-control custom-radio poll-card-form__qn">
                                            <input type="radio" id="poll-card-form__qn1" name="poll" value="optionOne" className="custom-control-input" onChange={this.handleChange} />
                                            <label className="custom-control-label" htmlFor="poll-card-form__qn1">{optionOne.text}</label>
                                        </div>
                                        <div className="custom-control custom-radio poll-card-form__qn">
                                            <input type="radio" id="poll-card-form__qn2" name="poll" value="optionTwo" className="custom-control-input" onChange={this.handleChange} />
                                            <label className="custom-control-label" htmlFor="poll-card-form__qn2">{optionTwo.text}</label>
                                        </div>
                                    </div>
                                    <div className="form-row text-center mt-5">
                                        <button type="submit" className="btn btn-lg btn-primary mx-auto">Vote now</button>
                                    </div>
                                </form>
                                </React.Fragment>)           
                        : (<React.Fragment>
                            <h2 className="md-font-size">Results:</h2>
                            <div className="poll-result-wrap">
                                {/* Poll Result */}
                                <div className={`poll-card-result text-center mt-3 p-4 rounded ${answeredVal === 'optionOne' ? 'active' : ''}`}>
                                    <h3 className="base-font-size font-weight__400">{optionOne.text}</h3>
                                    <div className="progress mt-3">
                                        <div className={`progress-bar font-weight__600 ${answeredVal === 'optionOne' ? 'bg-primary' : 'bg-light'}`} role="progressbar" style={{width: (percent(votes.optionOne, votes.total) + '%')}} aria-valuenow={percent(votes.optionOne, votes.total)} aria-valuemin="0" aria-valuemax="100">
                                            <span>{percent(votes.optionOne, votes.total) + '%'}</span>
                                        </div>
                                    </div>
                        <div className="poll-card-result__num font-weight__600 mt-2 xs-font-size">{votes.optionOne} out of {votes.total}</div>
                                </div>
                                {/* End Poll Result */}
                                {/* Poll Result */}
                                <div className={`poll-card-result text-center mt-3 p-4 rounded ${answeredVal === 'optionTwo' ? 'active' : ''}`}>
                                    <h3 className="base-font-size font-weight__400">{optionTwo.text}</h3>
                                    <div className="progress mt-3">
                                        <div className={`progress-bar font-weight__600 ${answeredVal === 'optionTwo' ? 'bg-primary' : 'bg-light'}`} role="progressbar" style={{width: (percent(votes.optionTwo, votes.total) + '%')}} aria-valuenow={percent(votes.optionTwo, votes.total)} aria-valuemin="0" aria-valuemax="100">
                                            <span>{percent(votes.optionTwo, votes.total) + '%'}</span>
                                        </div>
                                    </div>
                                    <div className="poll-card-result__num font-weight__600 mt-2 xs-font-size">{votes.optionTwo} out of {votes.total}</div>
                                </div>
                                {/* End Poll Result */}
                            </div>
                        </React.Fragment>)
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps ({questions, authedUser, users}, {id}) {
    return {
        question: questions[id],
        authedUser,
        users,
        authedUsername: users[questions[id].author].name,
        authedUserImg: users[questions[id].author].avatarURL
    }
}

export default withRouter(connect(mapStateToProps)(QuestionCard));