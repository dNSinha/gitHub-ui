import Axios from 'axios';
import { User } from '../../types/user';
import { Organization } from '../../types/organization';
import { Gists } from '../../types/gists';
import { Repository } from '../../types/Repository';

// const URI = "https://api.github.com/users/";
const URI = "http://localhost:3001/api";

export default class GitHubApi {

    static getUserDetails(userName: string) {
        return new Promise<User>((resolve, reject) => {
            // const url = URI + userName;
            const url = URI + '/users/' + userName;
            Axios.get(url).then(response => {
                // resolve(response && response.data);
                resolve(response && response.data && response.data.data && response.data.data.userDetails);
            }).catch(err => {
                reject(err);
            })
        })
    }

    static getUserRepos(userName: string) {
        return new Promise<Repository[]>((resolve, reject) => {
            // const url = URI + userName + '/repos';
            const url = URI + '/repos/' + userName;
            Axios.get(url).then(response => {
                // resolve(response && response.data);
                resolve(response && response.data && response.data.data && response.data.data.userRepos);
            }).catch(err => {
                reject(err);
            })
        })
    }

    static getGists(userName: string) {
        return new Promise<Gists[]>((resolve, reject) => {
            // const url = URI + userName + "/gists";
            const url = URI + '/gists/' + userName;
            Axios.get(url).then(response => {
                // resolve(response && response.data);
                resolve(response && response.data && response.data.data && response.data.data.userGists);
            }).catch(err => {
                reject(err);
            })
        })
    }

    static getOrganisation(userName: string) {
        return new Promise<Organization[]>((resolve, reject) => {
            // const url = URI + userName + "/orgs";
            const url = URI + '/orgs/' + userName;
            Axios.get(url).then(response => {
                // resolve(response && response.data);
                resolve(response && response.data && response.data.data && response.data.data.userOrgs);
            }).catch(err => {
                reject(err);
            })
        })
    }
};

