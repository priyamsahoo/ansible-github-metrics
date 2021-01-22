import { gql } from '@apollo/client';

const MY_ISSUES =  gql`
    {
        repositoryOwner(login: "BroadwayFriends") {
        repository(name: "FriendlyNeighborAndroid") {
            name
            issues(last: 100) {
            totalCount
            edges {
                node {
                id
                createdAt
                title
                url
                createdAt
                author {
                    login
                }
                closed
                }
            }
            }
        }
        }
    }
`;

const ISSUES = gql`
    query ($repositoryName: String!){
        repository(name: $repositoryName, owner: "ansible-collections") {
            name,
            issues(first: 100) {
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


export { ISSUES };