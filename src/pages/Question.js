import React from 'react';
import { connect } from 'react-redux';
import QuestionCard from '../components/QuestionCard';
import { withRouter } from 'react-router-dom';
import NotFound from './NotFound';

const Question = (props) => {

    const id = props.match.params.id;

    return (
        <div className="col-8 mx-auto">
            {/* Question Card */}
            {props.questionsIds.includes(id)
                ? <QuestionCard id={id}/>
                : <NotFound />
            }
            {/* End Question Card */}
        </div>
    );
}

function mapStateToProps ({questions}) {
    return{
        questionsIds: Object.keys(questions)
    }
}

export default withRouter(connect(mapStateToProps)(Question));