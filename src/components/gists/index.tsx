import React from 'react';
import GitHubApi from '../../api/github';
import AccordionOutput from '../../common/accordion';
import AlertDismissible from '../../common/alert';
import { Gists } from '../../types/gists';

type Attributes = {
  key?: string;
  value?: string;
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
  accordianInput: AccordianInput[];
  showAlert: boolean;
}

export default class GistsView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      accordianInput: [],
      showAlert: false
    };
    // https://api.github.com/users/gdb/gists
  }

  componentDidMount() {
    GitHubApi.getGists(this.props.userName)
      .then(res => {
        if (res.length > 0) {
          const accordianInput: AccordianInput[] = this.showGists(res);
          this.setState({ accordianInput });
        } else {
          this.setState({ showAlert: true });
        }
      }).catch(error => {
        this.setState({ showAlert: true });
      })
  }

  showGists = (gists: Gists[]): AccordianInput[] => {
    let accordian: AccordianInput[] = [];

    gists.forEach((data: Gists) => {
      if (data.description) {
        let accord: AccordianInput = {};
        accord.data = [];
        let attribute: Attributes = {};

        accord.heading = data.description;

        attribute.key = "Description";
        let objectKey = Object.keys(data.files);
        attribute.value = data.files[objectKey[0]].raw_url;
        attribute.type = 'url';
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
          <h1>No Gists found!</h1> :
          <AccordionOutput accordianInput={this.state.accordianInput} />
        }
      </>
    )
  }
}