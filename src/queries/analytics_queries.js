import { gql } from "@apollo/client";

const ISSUES_AND_PR = gql`
  query MyQuery($repository: String!) {
    repository(name: $repository, owner: "ansible-collections") {
      issues(last: 100) {
        totalCount
        nodes {
          createdAt
          state
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

export { ISSUES_AND_PR };
