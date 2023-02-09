import React from 'react';
import { User } from '../../types/user';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import GitHubApi from '../../api/github';
import GistsView from '../gists';
import OrganizationView from '../organization';
import AlertDismissible from '../../common/alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Repository } from '../../types/Repository';
import RepoView from '../repos';

type IProps = {

}

type IState = {
  user: User;
  validated: boolean;
  setValidated: boolean;
  userName: string;
  isGist: boolean;
  isOrganization: boolean;
  showAlert: boolean;
  isRepos: boolean;
  reset: boolean;
}

export default class UserView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      user: {},
      validated: false,
      setValidated: false,
      userName: '',
      isGist: false,
      isOrganization: false,
      showAlert: false,
      isRepos: false,
      reset: false
    };
  }

  componentDidMount() {

  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let value = event.target.value;
    this.setState({
      userName: value,
      showAlert: false,
      user: {},
      reset: true
    });
  };

  getUser = (): void => {
    GitHubApi.getUserDetails(this.state.userName)
      .then(res => {
        this.setState({ user: res });
      }).catch(error => {
        this.setState({ showAlert: true });
      })
  };

  showRepos = (): void => {
    this.setState({
      isRepos: true,
      isGist: false,
      isOrganization: false
    });
  };

  showGists = (): void => {
    this.setState({
      isRepos: false,
      isGist: true,
      isOrganization: false
    });
  };

  showOrganization = (): void => {
    this.setState({
      isRepos: false,
      isGist: false,
      isOrganization: true
    });
  };



  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.getUser();
    }
    this.setState({ validated: true, reset: false });
  };

  render() {
    return (
      <Container>
        {this.state.showAlert ?
          <AlertDismissible heading={'User not found!'} text={'The user couldnot be found please try with another user.'} /> : null}
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
          <Form.Group controlId="validationCustomUsername">
            <Row className='input'>
              <Col xs={2}><Form.Label>Username:</Form.Label></Col>
              <Col xs={4}><InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="userName"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  value={this.state.userName}
                  onChange={this.handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a username.
                </Form.Control.Feedback>
              </InputGroup>
              </Col>
              <Col xs={2}><Button className='btn-width' type="submit">Submit form</Button></Col>
            </Row>
          </Form.Group>
        </Form>
        <Row>
          <Col xs={2}><Button className='btn-width add-on' onClick={this.showRepos}>Repository</Button></Col>
          <Col xs={2}><Button className='btn-width add-on' onClick={this.showGists}>Gists</Button></Col>
          <Col xs={2}><Button className='btn-width add-on' onClick={this.showOrganization}>Organization</Button></Col>
        </Row>

        <div className='userDetails'>
          <h1>{this.state?.user?.name}</h1>
        </div>

        <div>
          {!this.state.reset && this.state.isRepos ? <RepoView userName={this.state.userName} /> : null}
          {!this.state.reset && this.state.isGist ? <GistsView userName={this.state.userName} /> : null}
          {!this.state.reset && this.state.isOrganization ? <OrganizationView userName={this.state.userName} /> : null}
        </div>

      </Container>
    )
  }
}