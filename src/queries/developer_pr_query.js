import { gql } from "@apollo/client";

const DEVELOPER_PR = gql`
  query pr(
    $cisco_nxos_open_pr: String!
    $cisco_nxos_merged_pr: String!
    $cisco_ios_open_pr: String!
    $cisco_ios_merged_pr: String!
    $cisco_iosxr_open_pr: String!
    $cisco_iosxr_merged_pr: String!
    $arista_eos_open_pr: String!
    $arista_eos_merged_pr: String!
  ) {
    CISCO_NXOS_OPEN_PR: search(query: $cisco_nxos_open_pr, type: ISSUE) {
      issueCount
    }
    CISCO_NXOS_MERGED_PR: search(query: $cisco_nxos_merged_pr, type: ISSUE) {
      issueCount
    }
    CISCO_IOS_OPEN_PR: search(query: $cisco_ios_open_pr, type: ISSUE) {
      issueCount
    }
    CISCO_IOS_MERGED_PR: search(query: $cisco_ios_merged_pr, type: ISSUE) {
      issueCount
    }
    CISCO_IOSXR_OPEN_PR: search(query: $cisco_iosxr_open_pr, type: ISSUE) {
      issueCount
    }
    CISCO_IOSXR_MERGED_PR: search(query: $cisco_iosxr_merged_pr, type: ISSUE) {
      issueCount
    }
    ARISTA_EOS_OPEN_PR: search(query: $arista_eos_open_pr, type: ISSUE) {
      issueCount
    }
    ARISTA_EOS_MERGED_PR: search(query: $arista_eos_merged_pr, type: ISSUE) {
      issueCount
    }
  }
`;

export { DEVELOPER_PR };
