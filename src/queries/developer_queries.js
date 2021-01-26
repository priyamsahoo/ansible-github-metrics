import { gql } from "@apollo/client";

const DEVELOPER_LIST = gql`
  {
    organization(login: "ansible-collections") {
      membersWithRole(last: 100) {
        nodes {
          login
          name
        }
      }
    }
  }
`;

export { DEVELOPER_LIST };
