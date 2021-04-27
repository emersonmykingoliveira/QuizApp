import React from 'react';
import authService from './api-authorization/AuthorizeService';

export class QuestionForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            questionContent: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            answer1Id: 0,
            answer2Id: 0,
            answer3Id: 0,
            answer4Id: 0,
            correctAnswer: ''
        };
    }

    async componentDidMount() {
        if (this.props.questionId) {
            await this.getQuestionById(this.props.questionId);
        }
        else {
            this.setState({
                questionContent: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                correctAnswer: '',
            });
        }
    }

    getQuestionById = async (questionId) => {
        const token = await authService.getAccessToken();
        await fetch(`api/admin/${questionId}`, { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({
                    questionContent: data.content,
                    answer1Id: data.answers[0].id,
                    answer1: data.answers[0].content,
                    answer2Id: data.answers[1].id,
                    answer2: data.answers[1].content,
                    answer3Id: data.answers[2].id,
                    answer3: data.answers[2].content,
                    answer4Id: data.answers[3].id,
                    answer4: data.answers[3].content,
                    correctAnswer: data.correctAnswer
                });
            })
            .catch(err => console.error(err));
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    submitHandler = async (event) => {
        event.preventDefault();
        if (!this.props.questionId) {
            await this.submitForm();
        }
        else {
            await this.updateForm(this.props.questionId);
        }
        await this.props.handler();
    }

    updateForm = async (questionId) => {
        const token = await authService.getAccessToken();
        const body = {
            id: questionId,
            content: this.state.questionContent,
            answers: [
                {
                    id: this.state.answer1Id,
                    content: this.state.answer1
                },
                {
                    id: this.state.answer2Id,
                    content: this.state.answer2
                },
                {
                    id: this.state.answer3Id,
                    content: this.state.answer3
                },
                {
                    id: this.state.answer4Id,
                    content: this.state.answer4
                }
            ],
            correctAnswer: this.state.correctAnswer
        };
        const stringifyBody = JSON.stringify(body);

        await fetch(`api/admin/${questionId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': (!token ? '' : `Bearer ${token}`)
            },
            body: stringifyBody
        })
            .then(response => response.json())
            .then(data => console.info(data))
            .catch(err => {
                console.error(err);
            });
    }

    submitForm = async () => {
        const token = await authService.getAccessToken();
        const body = {
            content: this.state.questionContent,
            answers: [
                {
                    content: this.state.answer1
                },
                {
                    content: this.state.answer2
                },
                {
                    content: this.state.answer3
                },
                {
                    content: this.state.answer4
                }
            ],
            correctAnswer: this.state.correctAnswer
        };
        const stringifyBody = JSON.stringify(body);

        await fetch('api/admin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': (!token ? '' : `Bearer ${token}`)
            },
            body: stringifyBody
        })
            .then(response => response.json())
            .then(data => console.info(data))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <form className="mt-4" onSubmit={this.submitHandler}>
                <div className="form-group">
                    <label htmlFor="questionContent">Question content:</label>
                    <input type="textarea"
                        name="questionContent"
                        id="questionContent"
                        value={this.state.questionContent}
                        onChange={this.changeHandler}
                        placeholder="Type here question content..."
                        className="form-control form-control-lg"
                    />
                    <span className="text-danger" style={(this.state.questionContent === '') ? { display: 'block' } : { display: 'none' }}>This is a mandatory field</span>
                </div>
                <div className="form-group">
                    <label htmlFor="answer1">Answer 1:</label>
                    <input type="text"
                        name="answer1"
                        id="answer1"
                        value={this.state.answer1}
                        onChange={this.changeHandler}
                        placeholder="Type the first answer option..."
                        className="form-control form-control-lg"
                    />
                    <span className="text-danger" style={(this.state.answer1 === '') ? { display: 'block' } : { display: 'none' }}>This is a mandatory field</span>
                </div>
                <div className="form-group">
                    <label htmlFor="answer2">Answer 2:</label>
                    <input type="text"
                        name="answer2"
                        id="answer2"
                        value={this.state.answer2}
                        onChange={this.changeHandler}
                        placeholder="Type the second answer option..."
                        className="form-control form-control-lg"
                    />
                    <span className="text-danger" style={(this.state.answer2 === '') ? { display: 'block' } : { display: 'none' }}>This is a mandatory field</span>
                </div>
                <div className="form-group">
                    <label htmlFor="answer3">Answer 3:</label>
                    <input type="text"
                        name="answer3"
                        id="answer3"
                        value={this.state.answer3}
                        onChange={this.changeHandler}
                        placeholder="Type the third answer option..."
                        className="form-control form-control-lg"
                    />
                    <span className="text-danger" style={(this.state.answer3 === '') ? { display: 'block' } : { display: 'none' }}>This is a mandatory field</span>
                </div>
                <div className="form-group">
                    <label htmlFor="answer4">Answer 4:</label>
                    <input type="text"
                        name="answer4"
                        id="answer4"
                        value={this.state.answer4}
                        onChange={this.changeHandler}
                        placeholder="Type the fourth answer option..."
                        className="form-control form-control-lg"
                    />
                    <span className="text-danger" style={(this.state.answer4 === '') ? { display: 'block' } : { display: 'none' }}>This is a mandatory field</span>
                </div>
                <div className="form-group">
                    <label htmlFor="correctAnswer">Correct Answer:</label>
                    <input type="text"
                        name="correctAnswer"
                        id="correctAnswer"
                        value={this.state.correctAnswer}
                        onChange={this.changeHandler}
                        placeholder="Type the correct answer..."
                        className="form-control form-control-lg"
                    />
                    <span className="text-danger" style={(this.state.correctAnswer === '') ? { display: 'block' } : { display: 'none' }}>This is a mandatory field</span>
                </div>
                <input type='submit' className='btn btn-success btn-lg' value='Submit question'
                    style={(this.state.questionContent === '' ||
                        this.state.answer1 === '' ||
                        this.state.answer2 === '' ||
                        this.state.answer3 === '' ||
                        this.state.answer4 === '' ||
                        this.state.correctAnswer === '') ? { display: 'none' } : { display: 'block' }}
                />
            </form>
        );
    }
}
