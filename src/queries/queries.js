import { gql } from '@apollo/client';

const ISSUES = gql`
    query ($repositoryName: String!){
        repository(name: $repositoryName, owner: "ansible-collections") {
            name,
            issues(last: 100) {
            edges {
                node {
                author {
                    login
                }
                state
                title
                createdAt
                url
                updatedAt
                id
                }
            }
            }
        }
    }
`;

const PR = gql`
    query ($repositoryName: String!){
        repository(name: $repositoryName, owner: "ansible-collections") {
        name
        pullRequests(last: 100) {
            edges {
            node {
                author {
                login
                }
                createdAt
                merged
                mergeable
                milestone {
                description
                creator {
                    login
                }
                }
                updatedAt
                url
                state
                title
            }
            }
        }
    }
  }
`;

const NUMBER_OF_OPEN_ISSUES = gql`
    query ($repositoryName: String!){
        repository(name: $repositoryName, owner: "ansible-collections") {
        name
        issues(filterBy: {states: OPEN}) {
            totalCount
        }
        }
    }
`;

export { ISSUES, PR, NUMBER_OF_OPEN_ISSUES };