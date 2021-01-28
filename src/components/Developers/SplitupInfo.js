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
      },
    }
  );

  // console.log(prData);

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
