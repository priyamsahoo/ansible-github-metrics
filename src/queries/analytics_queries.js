import { gql } from "@apollo/client";

const TEST = gql`
  query MyQuery($repository: String!) {
    repository(name: $repository, owner: "ansible-collections") {
      issues(last: 100) {
        totalCount
        nodes {
          createdAt
          state
        }
      }
    }
  }
`;

export { TEST };
