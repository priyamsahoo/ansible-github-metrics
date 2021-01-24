import { gql } from "@apollo/client";

const ISSUES = gql`
  query($repositoryName: String!) {
    repository(name: $repositoryName, owner: "ansible-collections") {
      name
      issues(last: 100, orderBy: { field: CREATED_AT, direction: DESC }) {
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
  query($repositoryName: String!) {
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

const COLLECTION_INSIGHTS = gql`
  query($repositoryName: String!) {
    repository(name: $repositoryName, owner: "ansible-collections") {
      openIssues: issues(filterBy: { states: [OPEN] }) {
        totalCount
      }
      closedIssues: issues(filterBy: { states: [CLOSED] }) {
        totalCount
      }
      openPRs: pullRequests(states: OPEN) {
        totalCount
      }
      closedPRs: pullRequests(states: CLOSED) {
        totalCount
      }
      mergedPRs: pullRequests(states: MERGED) {
        totalCount
      }
    }
  }
`;

export { ISSUES, PR, COLLECTION_INSIGHTS };
