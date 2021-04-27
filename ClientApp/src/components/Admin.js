import React from 'react';
import authService from './api-authorization/AuthorizeService';
import { Card, CardTitle, ListGroup, ListGroupItem, CardFooter, CardText, ButtonGroup, Button } from 'reactstrap';
import { QuestionForm } from './QuestionForm';


export class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            isLoaded: false,
            isAddQuestionButtonClicked: false,
            isEditQuestionButtonClicked: false,
            editQuestionId: undefined,
            accessDenied: false
        };

    }

    handleAddQuestion = () => {
        this.setState({ isAddQuestionButtonClicked: true, editQuestionId: undefined, isEditQuestionButtonClicked: false });
    }

    handleEditQuestion = (questionId) => {
        this.setState({ isEditQuestionButtonClicked: true, editQuestionId: questionId, isAddQuestionButtonClicked: false });
    }

    handleBackToQuestions = async () => {
        await this.getQuestionsForAdmin();
        this.setState({
            isAddQuestionButtonClicked: false,
            isEditQuestionButtonClicked: false
        });
    }

    componentDidMount() {
        this.getQuestionsForAdmin();
    }

    deleteQuestion = async (questionId) => {
        alert(`This action is permanently deleting Question ${questionId}.`);
        const token = await authService.getAccessToken();
        await fetch(`api/admin/${questionId}`, {
            method: 'DELETE',
            headers: { 'Authorization': (!token ? '' : `Bearer ${token}`) }
        })
            .then(response => response.json())
            .then(data => console.info(data))
            .catch(err => console.error(err));

        this.getQuestionsForAdmin();
    }

    getQuestionsForAdmin = async () => {
        const token = await authService.getAccessToken();
        await fetch("api/admin", { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                if (response.status != 200) {
                    this.setState({ accessDenied: true });
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                this.setState({ questions: data, isLoaded: true })
            })
            .catch(err => console.error(err));
    }

    render() {
        if (this.state.accessDenied) {
            return (
                <div className="mt-5 ui placeholder segment">
                    <div className="ui icon header">
                        <i aria-hidden="true" className="lock icon text-danger"></i>
                        <h2 className="text-danger">Access denied</h2>
                        <h6 className="text-danger">You are not authorized to visit this page</h6>
                    </div>
                </div>                  
            );
        }
        else {
            return (
                <div>
                    <div>
                        <Button size="lg" className="mb-4 mt-4 text-primary" style={(this.state.isAddQuestionButtonClicked || this.state.isEditQuestionButtonClicked) ? { display: 'none' } : { display: 'block' }} onClick={this.handleAddQuestion}><i aria-hidden="true" class="plus circle icon"></i>Add Question</Button>
                    </div>
                    {
                        (this.state.isAddQuestionButtonClicked || this.state.isEditQuestionButtonClicked) ?
                            ( <QuestionForm handler={this.handleBackToQuestions} questionId={this.state.editQuestionId} /> ) :
                            (
                                <div>
                                    {this.state.questions.map((question) =>
                                        <Card className="mt-2 mb-4 " key={question.id}>
                                            <CardTitle className="m-2 h3">Question {question.id}: {question.content}</CardTitle>
                                            <ListGroup className="m-2 ">
                                                Answers: {
                                                    question.answers.map((answer) =>
                                                        <ListGroupItem className="m-2" key={answer.id}>{answer.content}</ListGroupItem>
                                                )}
                                            </ListGroup>
                                            <CardText className="m-2">Correct answer:{question.correctAnswer}</CardText>
                                            <CardFooter className="bg-white">
                                                <ButtonGroup size="lg" className="mb-2 float-right">
                                                    <Button onClick={() => this.handleEditQuestion(question.id)} className="text-success"><i aria-hidden="true" class="edit icon"></i>Edit</Button>
                                                    <Button onClick={() => this.deleteQuestion(question.id)} className="text-danger"><i aria-hidden="true" class="trash alternate outline icon"></i>Delete</Button>
                                                </ButtonGroup>
                                            </CardFooter>
                                        </Card>
                                    )}
                                </div>
                            )
                    }
                </div>
            );
        }
    }
}
