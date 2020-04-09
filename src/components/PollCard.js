import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const PollCard = (props) => {
    const { id, optionOne, optionTwo } = props.question;
    const { userName, userImg } = props;
    return (
        <Link to={`/question/${id}`} className="card poll-card rounded border-primary">
            <div className="card-content text-dark">
                <h2 className="md-font-size">Would you rather</h2>
                <div className="poll-card-option">
                    <div className="poll-card-option__qn">{optionOne.text}</div>
                    <div className="poll-card-option__qn">{optionTwo.text}</div>
                </div>
            </div>
            <div className="card-footer bg-primary border-0 p-0">
                <div className="row align-items-center">
                    <div className="col-8">
                        <div className="row align-items-center">
                            <div className="col-auto px-2">
                                <img src={userImg} className="poll-card__img rounded-circle" alt=""/>
                            </div>
                            <div className="col pl-2 pr-0">
                                <h3 className="poll-card__author base-plus-font-size text-white font-weight__600">{userName}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <button className="poll-card__btn">View Poll</button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

function mapStateToProps ({users, questions}, {id} ) {
    return {
        question: questions[id],
        userName: users[questions[id].author].name,
        userImg: users[questions[id].author].avatarURL
    }
}

export default withRouter(connect(mapStateToProps)(PollCard));