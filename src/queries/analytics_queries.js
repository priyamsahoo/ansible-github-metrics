import { gql } from "@apollo/client";

// const ISSUES_AND_PR = gql`
//   query MyQuery($repository: String!) {
//     repository(name: $repository, owner: "ansible-collections") {
//       issues(last: 100, states: OPEN) {
//         totalCount
//         nodes {
//           createdAt
//         }
//       }
//       pullRequests(last: 100) {
//         totalCount
//         nodes {
//           createdAt
//         }
//       }
//     }
//   }
// `;

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

const ISSUES_AND_PR_AVERAGE = gql`
  query MyQuery($repository: String!) {
    ISSUE_AVG: repository(name: $repository, owner: "ansible-collections") {
      issues(states: CLOSED, last: 100) {
        nodes {
          createdAt
          closedAt
        }
      }
    }
    PR_AVG: repository(name: $repository, owner: "ansible-collections") {
      pullRequests(states: MERGED, last: 100) {
        nodes {
          createdAt
          mergedAt
        }
      }
    }
  }
`;

export { ISSUES_AND_PR_SPLITUP, ISSUES_AND_PR_AVERAGE };
