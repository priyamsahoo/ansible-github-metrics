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
    $vyos_open_pr: String!
    $vyos_merged_pr: String!
    $junos_open_pr: String!
    $junos_merged_pr: String!
    $cisco_asa_open_pr: String!
    $cisco_asa_merged_pr: String!
    $ansible_netcommon_open_pr: String!
    $ansible_netcommon_merged_pr: String!
    $frr_open_pr: String!
    $frr_merged_pr: String!
    $openvswitch_open_pr: String!
    $openvswitch_merged_pr: String!
    $community_yang_open_pr: String!
    $community_yang_merged_pr: String!
    $ansible_utils_open_pr: String!
    $ansible_utils_merged_pr: String!
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
    VYOS_OPEN_PR: search(query: $vyos_open_pr, type: ISSUE) {
      issueCount
    }
    VYOS_MERGED_PR: search(query: $vyos_merged_pr, type: ISSUE) {
      issueCount
    }
    JUNOS_OPEN_PR: search(query: $junos_open_pr, type: ISSUE) {
      issueCount
    }
    JUNOS_MERGED_PR: search(query: $junos_merged_pr, type: ISSUE) {
      issueCount
    }
    CISCO_ASA_OPEN_PR: search(query: $cisco_asa_open_pr, type: ISSUE) {
      issueCount
    }
    CISCO_ASA_MERGED_PR: search(query: $cisco_asa_merged_pr, type: ISSUE) {
      issueCount
    }
    ANSIBLE_NETCOMMON_OPEN_PR: search(
      query: $ansible_netcommon_open_pr
      type: ISSUE
    ) {
      issueCount
    }
    ANSIBLE_NETCOMMON_MERGED_PR: search(
      query: $ansible_netcommon_merged_pr
      type: ISSUE
    ) {
      issueCount
    }
    FRR_OPEN_PR: search(query: $frr_open_pr, type: ISSUE) {
      issueCount
    }
    FRR_MERGED_PR: search(query: $frr_merged_pr, type: ISSUE) {
      issueCount
    }
    OPENVSWITCH_OPEN_PR: search(query: $openvswitch_open_pr, type: ISSUE) {
      issueCount
    }
    OPENVSWITCH_MERGED_PR: search(query: $openvswitch_merged_pr, type: ISSUE) {
      issueCount
    }
    COMMUNITY_YANG_OPEN_PR: search(
      query: $community_yang_open_pr
      type: ISSUE
    ) {
      issueCount
    }
    COMMUNITY_YANG_MERGED_PR: search(
      query: $community_yang_merged_pr
      type: ISSUE
    ) {
      issueCount
    }
    ANSIBLE_UTILS_OPEN_PR: search(query: $ansible_utils_open_pr, type: ISSUE) {
      issueCount
    }
    ANSIBLE_UTILS_MERGED_PR: search(
      query: $ansible_utils_merged_pr
      type: ISSUE
    ) {
      issueCount
    }
  }
`;

export { DEVELOPER_PR };
