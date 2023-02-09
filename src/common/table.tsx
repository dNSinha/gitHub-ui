import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Attributes = {
    key?: string;
    value?: string;
    type?: string;
};

type IProps = {
    attributes: Attributes[];
};

function ShowTable(props: IProps) {
    return (
        <Container>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Attributes</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {props.attributes.map((value, index) => {
                        return (
                            <tr>
                                <td>{value.key}</td>
                                <td>{value.type ? <a href={value.value} target="_blank">Link</a> : value.value}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>

    );
}

export default ShowTable;