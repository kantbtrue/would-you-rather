import { saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_USER_ANSWER  = 'SAVE_USER_ANSWER';

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function saveUserAnswer ({authedUser, qid, answer}) {
    return {
        type: SAVE_USER_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function handleUserAnswer (info) {
    return (dispatch) => {
        dispatch(saveUserAnswer(info));
        dispatch(showLoading());
        return saveQuestionAnswer(info)
        .then(() => dispatch(hideLoading()))
        .catch((e) => {
            console.log("Error in handleUserAnswer: ", e);
            dispatch(saveUserAnswer(info));
            alert("There was an error of adding the answered question in user database. Try again later.");
        });
    }
}