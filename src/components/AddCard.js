import React from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { withRouter } from 'react-router-dom';
import { showLoading, hideLoading } from 'react-redux-loading';

class AddCard extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(showLoading());
        this.props.dispatch(handleAddQuestion(
            this.optionOne.value,
            this.optionTwo.value
        ))
        .then(()=> this.props.history.push('/'))
        .then(()=> this.props.dispatch(hideLoading()))
    }

    render(){
        return (
            <div className="card poll-card rounded border-primary">
                <div className="card-header bg-primary border-0 p-0">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <div className="row align-items-center">
                                <div className="col pl-2 pr-0 text-center py-3">
                                    <h3 className="poll-card__author base-plus-font-size text-white font-weight__600">Create new question</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-content text-dark">
                    <h2 className="md-font-size">Would you rather</h2>
                    <form className="poll-form poll-form--new" onSubmit={this.handleSubmit}>
                        <div className="poll-card-form">
                            <div className="poll-card-form__qn">
                                <input type="text" className="form-control" id="poll-card-form__qn1"  ref={(value)=>this.optionOne = value} required />
                            </div>
                            <div className="poll-card-form__qn">
                                <input type="text" className="form-control" id="poll-card-form__qn1"  ref={(value)=>this.optionTwo = value} required />
                            </div>
                        </div>
                        <div className="form-row text-center mt-5">
                            <button type="submit" className="btn btn-lg btn-primary mx-auto">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProp ({authedUser}) {
    return {
        authedUser
    }
}

export default withRouter(connect(mapStateToProp)(AddCard));