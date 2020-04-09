import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_QUESTION_ANSWER  = 'SAVE_QUESTION_ANSWER';

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion (question){
    return {
        type: ADD_QUESTION,
        question
    }
}

export function saveQnsAnswer ({authedUser, qid, answer}) {
    return {
        type: SAVE_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading())
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        })
        .then((question) => dispatch (addQuestion(question)))
        .then(() => dispatch(hideLoading()))
        .catch((e) => {
            console.log("Error in handleAddQuestion: ", e);
            dispatch(saveQuestion({
                optionOneText,
                optionTwoText,
                author: authedUser,
            }));
            alert("There was an error adding question. Try again later.");
        });
    }
}

export function handleQuestionAnswer (info) {
    return (dispatch) => {
        dispatch(saveQnsAnswer(info));
        dispatch(showLoading())
        return saveQuestionAnswer(info)
        .then(() => dispatch(hideLoading()))
        .catch((e) => {
            console.log("Error in handleQuestionAnswer: ", e);
            dispatch(saveQnsAnswer(info));
            alert("There was an error of answering the question. Try again later.");
        });
    }
}