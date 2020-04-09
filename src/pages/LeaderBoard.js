import React from 'react';
import { connect } from 'react-redux';
import LeaderBoardCard from '../components/LeaderBoardCard';

const LeaderBoard = (props) => {
    return (
        <div className="col-12 mx-auto">
            <div className="row leaderboard-wrap">
                {props.userIds.map((id, i) => {
                    return (
                        <LeaderBoardCard key={id} id={id} crown={i} />
                    )
                })}
            </div>
        </div>
    );
}

function mapStateToProps ( { users } ) {
    return {
        users,
        userIds: Object.keys(users).sort((a,b) =>
            (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)
        )
    }
}

export default connect(mapStateToProps)(LeaderBoard);