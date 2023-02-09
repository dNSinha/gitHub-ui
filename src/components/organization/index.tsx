import React from 'react';
import GitHubApi from '../../api/github';
import AccordionOutput from '../../common/accordion';
import { Organization } from '../../types/organization';


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
  organisation: Organization[];
  accordianInput: AccordianInput[];
  showAlert: boolean;
}

export default class OrganizationView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      organisation: [],
      accordianInput: [],
      showAlert: false
    };
    // https://api.github.com/users/ad548/orgs
  }

  componentDidMount() {
    GitHubApi.getOrganisation(this.props.userName)
      .then(res => {
        if (res.length > 0) {
          const accordianInput: AccordianInput[] = this.showOrgs(res);
          this.setState({ accordianInput });
        } else {
          this.setState({ showAlert: true });
        }
      }).catch(error => {
        this.setState({ showAlert: true });
      })
  }

  showOrgs = (orgs: Organization[]): AccordianInput[] => {
    let accordian: AccordianInput[] = [];

    orgs.forEach((data: Organization) => {
      if (data.description) {
        let accord: AccordianInput = {};
        accord.data = [];
        let attribute: Attributes = {};

        accord.heading = data.description;

        attribute.key = "Url for Organisation";
        attribute.value = data.url;
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
          <h1>No Orgs found!</h1> :
          <AccordionOutput accordianInput={this.state.accordianInput} />
        }
      </>
    )
  }
}