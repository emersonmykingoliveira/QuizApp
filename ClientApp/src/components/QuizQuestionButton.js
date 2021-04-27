import React from 'react';

export class QuizQuestionButton extends React.Component {
    handleClickOnAnswerButton = () => {
        this.props.clickHandler(this.props.button_text);
    }

    render() {
        return (
            <li>
                <button style={{ width: 200 }} className="btn btn-outline-primary quiz_button mt-2 mb-2" onClick={this.handleClickOnAnswerButton} disabled={this.props.is_answered}>{this.props.button_text}</button>
            </li>
        )
    }
}
