import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import { Table, Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

export class Highscores extends Component {
    static displayName = Highscores.name;

    constructor(props) {
        super(props);
        this.state = { highscores: [], loading: true };
    }

    componentDidMount() {
        this.populateHighscores();
    }



    static renderHighscoresTable(highscores) {
        return (

            <Table hover>
                <thead className="bg-dark text-light">
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {highscores.map(score =>
                        <tr key={score.id}>
                            <td className="text-break">{score.username}</td>
                            <td>{Math.round((100 * score.points) / 10)}%</td>
                            <td>{new Intl.DateTimeFormat('en-GB', {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit"
                            }).format(Date.parse(score.date + 'Z'))}
                            </td>


                        </tr>
                    )}
                </tbody>
            </Table>


        );
    }


    static renderCards(highscores) {
        return (
            <Container>


                <Row className="font-weight-bold">

                    <Col >
                        Username
                        </Col>
                    <Col >
                        Points
                        </Col>
                    <Col >
                        Date
                        </Col>

                </Row>

                {highscores.map(score =>
                    <Row className="mt-3 border-top" key={score.id} >
                        <Col className="text-break">
                            {score.username}

                        </Col>
                        <Col >
                            {score.points}
                        </Col>
                        <Col >
                            {new Intl.DateTimeFormat('en-GB', {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit"
                            }).format(Date.parse(score.date + 'Z'))}

                        </Col>
                    </Row>
                )}


            </Container >

        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Highscores.renderHighscoresTable(this.state.highscores);

        return (
            <div>
                <h1 className="mt-4 mb-4 " id="tabelLabel" >Highscores</h1>
                {contents}

            </div>
        );
    }

    async populateHighscores() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/highscores', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ highscores: data, loading: false });
    }
}
