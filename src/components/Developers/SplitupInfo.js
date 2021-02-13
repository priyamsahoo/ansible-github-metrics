import { useQuery } from "@apollo/client";
import { DEVELOPER_ISSUE } from "../../queries/developer_issue_query";
import { DEVELOPER_PR } from "../../queries/developer_pr_query";
import RepositoryWiseDetails from "./RepositoryWiseDetails";

const SpiltupInfo = ({ selectedDeveloper }) => {
  const {
    loading: issueLoading,
    error: issueError,
    data: issueData,
  } = useQuery(DEVELOPER_ISSUE, {
    variables: { userName: selectedDeveloper },
  });

  // query strings for pr query

  // 1. cisco.nxos
  const cisco_nxos_open_pr_qs =
    "repo:ansible-collections/cisco.nxos type:pr is:open author:" +
    selectedDeveloper;
  const cisco_nxos_merged_pr_qs =
    "repo:ansible-collections/cisco.nxos type:pr is:merged author:" +
    selectedDeveloper;

  // 2. cisco.ios
  const cisco_ios_open_pr_qs =
    "repo:ansible-collections/cisco.ios type:pr is:open author:" +
    selectedDeveloper;
  const cisco_ios_merged_pr_qs =
    "repo:ansible-collections/cisco.ios type:pr is:merged author:" +
    selectedDeveloper;

  // 3. cisco.iosxr
  const cisco_iosxr_open_pr_qs =
    "repo:ansible-collections/cisco.iosxr type:pr is:open author:" +
    selectedDeveloper;
  const cisco_iosxr_merged_pr_qs =
    "repo:ansible-collections/cisco.iosxr type:pr is:merged author:" +
    selectedDeveloper;

  // 4. arista.eos
  const arista_eos_open_pr_qs =
    "repo:ansible-collections/arista.eos type:pr is:open author:" +
    selectedDeveloper;
  const arista_eos_merged_pr_qs =
    "repo:ansible-collections/arista.eos type:pr is:merged author:" +
    selectedDeveloper;

  // 5. vyos.vyos
  const vyos_open_pr_qs =
    "repo:ansible-collections/vyos.vyos type:pr is:open author:" +
    selectedDeveloper;
  const vyos_merged_pr_qs =
    "repo:ansible-collections/vyos.vyos type:pr is:merged author:" +
    selectedDeveloper;

  // 6. junipernetworks.junos
  const junos_open_pr_qs =
    "repo:ansible-collections/junipernetworks.junos type:pr is:open author:" +
    selectedDeveloper;
  const junos_merged_pr_qs =
    "repo:ansible-collections/junipernetworks.junos type:pr is:merged author:" +
    selectedDeveloper;

  // 7. cisco.asa
  const cisco_asa_open_pr_qs =
    "repo:ansible-collections/cisco.asa type:pr is:open author:" +
    selectedDeveloper;
  const cisco_asa_merged_pr_qs =
    "repo:ansible-collections/cisco.asa type:pr is:merged author:" +
    selectedDeveloper;

  // 8. ansible.netcommon
  const ansible_netcommon_open_pr_qs =
    "repo:ansible-collections/ansible.netcommon type:pr is:open author:" +
    selectedDeveloper;
  const ansible_netcommon_merged_pr_qs =
    "repo:ansible-collections/ansible.netcommon type:pr is:merged author:" +
    selectedDeveloper;

  // 9. frr.frr
  const frr_open_pr_qs =
    "repo:ansible-collections/frr.frr type:pr is:open author:" +
    selectedDeveloper;
  const frr_merged_pr_qs =
    "repo:ansible-collections/frr.frr type:pr is:merged author:" +
    selectedDeveloper;

  // 10. openvswitch.openvswitch
  const openvswitch_open_pr_qs =
    "repo:ansible-collections/openvswitch.openvswitch type:pr is:open author:" +
    selectedDeveloper;
  const openvswitch_merged_pr_qs =
    "repo:ansible-collections/openvswitch.openvswitch type:pr is:merged author:" +
    selectedDeveloper;

  // 11. community.yang
  const community_yang_open_pr_qs =
    "repo:ansible-collections/community.yang type:pr is:open author:" +
    selectedDeveloper;
  const community_yang_merged_pr_qs =
    "repo:ansible-collections/community.yang type:pr is:merged author:" +
    selectedDeveloper;

  // 12. ansible.utils
  const ansible_utils_open_pr_qs =
    "repo:ansible-collections/ansible.utils type:pr is:open author:" +
    selectedDeveloper;
  const ansible_utils_merged_pr_qs =
    "repo:ansible-collections/ansible.utils type:pr is:merged author:" +
    selectedDeveloper;

  const { loading: prLoading, error: prError, data: prData } = useQuery(
    DEVELOPER_PR,
    {
      variables: {
        cisco_nxos_open_pr: cisco_nxos_open_pr_qs,
        cisco_nxos_merged_pr: cisco_nxos_merged_pr_qs,
        cisco_ios_open_pr: cisco_ios_open_pr_qs,
        cisco_ios_merged_pr: cisco_ios_merged_pr_qs,
        cisco_iosxr_open_pr: cisco_iosxr_open_pr_qs,
        cisco_iosxr_merged_pr: cisco_iosxr_merged_pr_qs,
        arista_eos_open_pr: arista_eos_open_pr_qs,
        arista_eos_merged_pr: arista_eos_merged_pr_qs,
        vyos_open_pr: vyos_open_pr_qs,
        vyos_merged_pr: vyos_merged_pr_qs,
        junos_open_pr: junos_open_pr_qs,
        junos_merged_pr: junos_merged_pr_qs,
        cisco_asa_open_pr: cisco_asa_open_pr_qs,
        cisco_asa_merged_pr: cisco_asa_merged_pr_qs,
        ansible_netcommon_open_pr: ansible_netcommon_open_pr_qs,
        ansible_netcommon_merged_pr: ansible_netcommon_merged_pr_qs,
        frr_open_pr: frr_open_pr_qs,
        frr_merged_pr: frr_merged_pr_qs,
        openvswitch_open_pr: openvswitch_open_pr_qs,
        openvswitch_merged_pr: openvswitch_merged_pr_qs,
        community_yang_open_pr: community_yang_open_pr_qs,
        community_yang_merged_pr: community_yang_merged_pr_qs,
        ansible_utils_open_pr: ansible_utils_open_pr_qs,
        ansible_utils_merged_pr: ansible_utils_merged_pr_qs,
      },
    }
  );

  console.log("PR DATA: ", prData);

  return (
    <div className="splitup-info">
      <h2>Repository wise details of {selectedDeveloper}</h2>
      {issueLoading && prLoading && <p>Loading...</p>}
      {issueError && prError && <p>{issueError + "AND" + prError}</p>}
      {issueData && prData && (
        <RepositoryWiseDetails issueData={issueData} prData={prData} />
      )}
    </div>
  );
};

export default SpiltupInfo;
