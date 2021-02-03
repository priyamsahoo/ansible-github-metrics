import { gql } from "@apollo/client";

const ISSUES_AND_PR = gql`
  query MyQuery($repository: String!) {
    repository(name: $repository, owner: "ansible-collections") {
      issues(last: 100) {
        totalCount
        nodes {
          createdAt
        }
      }
      pullRequests(last: 100) {
        totalCount
        nodes {
          createdAt
        }
      }
    }
  }
`;

const ISSUES_AND_PR_SPLITUP = gql`
  query MyQuery($repository: String!) {
    OPEN_ISSUES: repository(name: $repository, owner: "ansible-collections") {
      issues(last: 100, states: OPEN) {
        totalCount
        nodes {
          createdAt
        }
      }
    }
    CLOSED_ISSUES: repository(name: $repository, owner: "ansible-collections") {
      issues(last: 100, states: CLOSED) {
        totalCount
        nodes {
          createdAt
        }
      }
    }
    OPEN_PR: repository(name: $repository, owner: "ansible-collections") {
      pullRequests(states: OPEN, last: 100) {
        totalCount
        nodes {
          createdAt
        }
      }
    }
    MERGED_PR: repository(name: $repository, owner: "ansible-collections") {
      pullRequests(states: MERGED, last: 100) {
        totalCount
        nodes {
          createdAt
        }
      }
    }
  }
`;

export { ISSUES_AND_PR, ISSUES_AND_PR_SPLITUP };
