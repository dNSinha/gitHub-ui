import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ShowTable from './table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

type AccordianInput = {
    heading?: string;
    data?: any;
}

type IProps = {
    accordianInput: AccordianInput[];
}

type IState = {
    show: boolean;
}

export default class AccordionOutput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            show: true
        };
    }

    componentDidMount() {

    }


    handleClose = (event: React.FormEvent<HTMLFormElement>): void => {
        this.setState({ show: false });
    };

    render() {
        return (
            <Container>
                {this.props.accordianInput.map((value, id) => {
                    return (
                        <Row className='accordian'>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey={id.toString()}>
                                    <Accordion.Header>{value?.heading}</Accordion.Header>
                                    <Accordion.Body>
                                        <ShowTable attributes={value?.data} />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Row>
                    )
                })}
            </Container>
        )
    }
}