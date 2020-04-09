import React from 'react';
import { connect } from 'react-redux';

const LeaderBoardCard = (props) => {
    const { name, avatar, answers, questions, score, crown } = props;
    let award = '';
    switch (crown) {
        case 0 :
            award = 'text-gold';
            break;
        case 1 :
            award = 'text-silver';
            break;
        case 2 :
            award = 'text-bronze';
            break;
        default:
            award = 'text-light';
            break;
    }
    return (        
        <div className="col-8 mx-auto">
            {/* Leader Card */}
            <div className="card poll-card rounded border-primary">
                <div className="card-header bg-primary border-0 p-0">
                    <div className="row align-items-center">
                        <div className="col">
                            <div className="row align-items-center">
                                <div className="col-auto px-2">
                                    <img src={avatar} className="poll-card__img rounded-circle" alt=""/>
                                </div>
                                <div className="col pl-2 pr-0">
                                    <h3 className="poll-card__author base-plus-font-size text-white font-weight__600">{name}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto pr-4">
                            <span className="fa-stack fa-sm">
                                <i className="fas fa-circle fa-stack-2x fa-inverse"></i>
                                <i className={`fas fa-crown fa-stack-1x ${award}`}></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card-content text-dark">
                    {/* Poll Board */}
                    <div className="poll-board-wrap">
                        <div className="poll-board">
                            <div className="row align-items-center">
                                <div className="col">
                                    <div className="base-font-size mt-2">Answered questions: {answers}</div>
                                    <div className="base-font-size mt-2">Created questions: {questions}</div>
                                </div>
                                <div className="col-auto">
                                    <div className="poll-board-card border border-primary rounded text-white">
                                        <div className="poll-board-card__header bg-primary rounded-top px-4 py-2 sm-font-size font-weight__600">Score</div>
                                        <div className="poll-board-card__score py-3 text-center">
                                            <span className="text-primary md-font-size font-weight__600">{score}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Poll Board */}
                </div>
            </div>
            {/* End Leader Card */}
        </div>
    );
}

function mapStateToProps ({users}, {id, crown} ) {
    return {
        crown,
        name: users[id].name,
        avatar: users[id].avatarURL,
        answers: Object.keys(users[id].answers).length,
        questions: users[id].questions.length,
        score: Object.keys(users[id].answers).length + users[id].questions.length
    };
}

export default connect(mapStateToProps)(LeaderBoardCard);