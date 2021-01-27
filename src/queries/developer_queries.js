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

const DEVELOPER_DETAILS = gql`
  query($userName: String!) {
    user(login: $userName) {
      name
      login
      email
      avatarUrl
      url
      ansibleCollections: contributionsCollection(
        organizationID: "MDEyOk9yZ2FuaXphdGlvbjQ0NTg2MjUy"
      ) {
        contributionCalendar {
          totalContributions
        }
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
      }
    }
  }
`;

export { DEVELOPER_LIST, DEVELOPER_DETAILS };
