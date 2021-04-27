import React from 'react';
import { QuizQuestionButton } from './QuizQuestionButton.js';

export class QuizQuestion extends React.Component {
    handleNextQuestion = () => {
        this.props.showNextQuestionHandler();
    }

    render() {
        return (
            <div>
                <div>
                    <h3 className="mt-5 mb-3 p-1">
                        <i aria-hidden="true" className="question circle icon"></i> &nbsp;Question {this.props.quizQuestion.id}
                    </h3>
                    <p>{this.props.quizQuestion.content}</p>
                </div>
                <div className="buttons">
                    <ul >
                        {this.props.quizQuestion.answers.map((answer, index) => {
                            return <QuizQuestionButton key={index} button_text={answer.content} is_answered={this.props.isAnswered}
                                clickHandler={this.props.handleAnswerQuestion} />
                            })
                        }
                    </ul>
                </div>
                {this.props.isAnswered
                    ? (
                        this.props.incorrectAnswer ?
                            <p className="alert alert-danger "><i aria-hidden="true" className="thumbs down icon"></i> &nbsp; Incorrect answer...</p>
                            : <p className=" alert alert-success"><i aria-hidden="true" className="thumbs up icon"></i> &nbsp;Correct answer!</p>
                    ) : (
                        <p className="alert alert-primary"><i aria-hidden="true" className="info circle icon"></i> &nbsp;You have to choose an answer</p>
                    )}
                {this.props.isAnswered && <button className="btn btn-primary" style={{ width: 200 }} onClick={this.handleNextQuestion}>Next</button>}
            </div>
        )
    }
}
