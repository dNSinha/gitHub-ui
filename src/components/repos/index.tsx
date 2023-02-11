import React from 'react';
import GitHubApi from '../../api/github';
import AccordionOutput from '../../common/accordion';
import { Gists } from '../../types/gists';
import { Repository } from '../../types/Repository';

type Attributes = {
  key?: string;
  value?: string|null;
  type?: string;
};

type AccordianInput = {
  heading?: string;
  data?: any;
}

type IProps = {
  userName: string;
}

type IState = {
  repos: Repository[];
  accordianInput: AccordianInput[];
  showAlert: boolean;
}

export default class RepoView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      repos: [],
      accordianInput: [],
      showAlert: false
    };
  }

  componentDidMount() {
    GitHubApi.getUserRepos(this.props.userName)
    .then(res => {
        const accordianInput: AccordianInput[] = this.showRepos(res);
        this.setState({ accordianInput });
    }).catch(error => {
      this.setState({ showAlert: true });
    })
  }

  showRepos = (repos: Repository[]): AccordianInput[] => {
    let accordian: AccordianInput[] = [];

    repos.forEach((data: Repository) => {
      if (data.name) {
        let accord: AccordianInput = {};
        accord.data = [];
        let attribute: Attributes = {};

        accord.heading = data.name;

        attribute.key = "Description";
        attribute.value = data.description;
        accord.data.push(attribute);

        accordian.push(accord);
      }
    })
    return accordian;
  }

  render() {
    return (
      <>
        {this.state.showAlert ?
          <h1>No Repos found!</h1> :
          this.state.accordianInput.length > 0 ?
          <div>
            <div className='feature-heading'><h2 className='features'>Repositories</h2></div>
            <AccordionOutput accordianInput={this.state.accordianInput} />
          </div> : null
        }
      </>
    )
  }
}