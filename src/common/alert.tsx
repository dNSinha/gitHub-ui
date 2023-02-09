import React from 'react';
import Alert from 'react-bootstrap/Alert';

type IProps = {
    heading: string;
    text: string;
}

type IState = {
    show: boolean;
}

export default class AlertDismissible extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            show: true
        };
    }

    componentDidMount() {

    }


    handleClose = (event: React.FormEvent<HTMLFormElement>): void => {
        console.log('this is alert')
        this.setState({ show: false });
    };

    render() {
        return (
            <>
                {this.state.show ?
                    <Alert className='alert' variant="warning" onClose={this.handleClose} dismissible>
                        <Alert.Heading>{this.props?.heading}</Alert.Heading>
                        <p>{this.props?.text}</p>
                    </Alert> : null}
            </>


        )
    }
}