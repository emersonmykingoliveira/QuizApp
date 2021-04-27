import React from 'react';
import authService from './api-authorization/AuthorizeService';

export class QuizFinish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    handleResetClick = () => {
        this.props.resetClickHandler();
    }

    async componentDidMount() {
        const currentDate = new Date();
        const user = await authService.getUser();
        this.setState({ name: user.name });
        const token = await authService.getAccessToken();

        const body = {
            username: this.state.name,
            points: this.props.showPointsHandler,
            date: currentDate
        };
        const stringifyBody = JSON.stringify(body);

        await fetch('api/highscores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': (!token ? '' : `Bearer ${token}`) },
            body: stringifyBody
        })
            .then(response => response.json())
            .then(data => console.info(data))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div className="mt-5 ui placeholder segment">
                <div className="ui icon header">
                    <i aria-hidden="true" className="chess queen icon text-success"></i>
                    <h2 className="text-success">Congratulations!</h2>
                    <h6 className="text-success mb-3">Result: {Math.round((100 * this.props.showPointsHandler) / 10)}% correct</h6>
                    <button className="btn btn-info" style={{ width: 200 }} onClick={this.handleResetClick} >Start a new Quiz</button>
                </div>
            </div>               
        )
    }
}
