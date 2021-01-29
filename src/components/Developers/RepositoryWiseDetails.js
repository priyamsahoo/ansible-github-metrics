const RepositoryWiseDetails = ({ issueData, prData }) => {
  console.log(issueData);

  const displayDetails = () => {
    return (
      <div className="details-inner">
        {/* 1. cisco.nxos */}
        <div className="repository-wise-issue-data">
          <h2>{issueData.CISCO_NXOS_OPEN_ISSUES.name}</h2>
          <p>
            Issues opened: {issueData.CISCO_NXOS_OPEN_ISSUES.issues.totalCount}
          </p>
          <p>
            Issues closed:{" "}
            {issueData.CISCO_NXOS_CLOSED_ISSUES.issues.totalCount}
          </p>
          <p>Open PRs: {prData.CISCO_NXOS_OPEN_PR.issueCount}</p>
          <p>Merged PRs: {prData.CISCO_NXOS_MERGED_PR.issueCount}</p>
        </div>

        {/* 2. cisco.ios */}
        <div className="repository-wise-issue-data">
          <h2>{issueData.CISCO_IOS_OPEN_ISSUES.name}</h2>
          <p>
            Issues opened: {issueData.CISCO_IOS_OPEN_ISSUES.issues.totalCount}
          </p>
          <p>
            Issues closed: {issueData.CISCO_IOS_CLOSED_ISSUES.issues.totalCount}
          </p>
          <p>Open PRs: {prData.CISCO_IOS_OPEN_PR.issueCount}</p>
          <p>Merged PRs: {prData.CISCO_IOS_MERGED_PR.issueCount}</p>
        </div>

        {/* 3. cisco.iosxr */}
        <div className="repository-wise-issue-data">
          <h2>{issueData.CISCO_IOSXR_OPEN_ISSUES.name}</h2>
          <p>
            Issues opened: {issueData.CISCO_IOSXR_OPEN_ISSUES.issues.totalCount}
          </p>
          <p>
            Issues closed:{" "}
            {issueData.CISCO_IOSXR_CLOSED_ISSUES.issues.totalCount}
          </p>
          <p>Open PRs: {prData.CISCO_IOSXR_OPEN_PR.issueCount}</p>
          <p>Merged PRs: {prData.CISCO_IOSXR_MERGED_PR.issueCount}</p>
        </div>

        {/* 4. arista.eos */}
        <div className="repository-wise-issue-data">
          <h2>{issueData.ARISTA_EOS_OPEN_ISSUES.name}</h2>
          <p>
            Issues opened: {issueData.ARISTA_EOS_OPEN_ISSUES.issues.totalCount}
          </p>
          <p>
            Issues closed:{" "}
            {issueData.ARISTA_EOS_CLOSED_ISSUES.issues.totalCount}
          </p>
          <p>Open PRs: {prData.ARISTA_EOS_OPEN_PR.issueCount}</p>
          <p>Merged PRs: {prData.ARISTA_EOS_MERGED_PR.issueCount}</p>
        </div>

        {/* 5. vyos.vyos */}
        <div className="repository-wise-issue-data">
          <h2>{issueData.VYOS_OPEN_ISSUES.name}</h2>
          <p>Issues opened: {issueData.VYOS_OPEN_ISSUES.issues.totalCount}</p>
          <p>Issues closed: {issueData.VYOS_CLOSED_ISSUES.issues.totalCount}</p>
          <p>Open PRs: {prData.VYOS_OPEN_PR.issueCount}</p>
          <p>Merged PRs: {prData.VYOS_MERGED_PR.issueCount}</p>
        </div>

        {/* 6. junipernetworks.junos */}
        <div className="repository-wise-issue-data">
          <h2>{issueData.JUNOS_OPEN_ISSUES.name}</h2>
          <p>Issues opened: {issueData.JUNOS_OPEN_ISSUES.issues.totalCount}</p>
          <p>
            Issues closed: {issueData.JUNOS_CLOSED_ISSUES.issues.totalCount}
          </p>
          <p>Open PRs: {prData.JUNOS_OPEN_PR.issueCount}</p>
          <p>Merged PRs: {prData.JUNOS_MERGED_PR.issueCount}</p>
        </div>

        {/* 7. cisco.asa */}
        <div className="repository-wise-issue-data">
          <h2>{issueData.CISCO_ASA_OPEN_ISSUES.name}</h2>
          <p>
            Issues opened: {issueData.CISCO_ASA_OPEN_ISSUES.issues.totalCount}
          </p>
          <p>
            Issues closed: {issueData.CISCO_ASA_CLOSED_ISSUES.issues.totalCount}
          </p>
          <p>Open PRs: {prData.CISCO_ASA_OPEN_PR.issueCount}</p>
          <p>Merged PRs: {prData.CISCO_ASA_MERGED_PR.issueCount}</p>
        </div>

        {/* 8. ansible.netcommon */}
        <div className="repository-wise-issue-data">
          <h2>{issueData.ANSIBLE_NETCOMMON_OPEN_ISSUES.name}</h2>
          <p>
            Issues opened:{" "}
            {issueData.ANSIBLE_NETCOMMON_OPEN_ISSUES.issues.totalCount}
          </p>
          <p>
            Issues closed:{" "}
            {issueData.ANSIBLE_NETCOMMON_CLOSED_ISSUES.issues.totalCount}
          </p>
          <p>Open PRs: {prData.ANSIBLE_NETCOMMON_OPEN_PR.issueCount}</p>
          <p>Merged PRs: {prData.ANSIBLE_NETCOMMON_MERGED_PR.issueCount}</p>
        </div>

        {/* 9. frr.frr */}
        <div className="repository-wise-issue-data">
          <h2>{issueData.FRR_OPEN_ISSUES.name}</h2>
          <p>Issues opened: {issueData.FRR_OPEN_ISSUES.issues.totalCount}</p>
          <p>Issues closed: {issueData.FRR_CLOSED_ISSUES.issues.totalCount}</p>
          <p>Open PRs: {prData.FRR_OPEN_PR.issueCount}</p>
          <p>Merged PRs: {prData.FRR_MERGED_PR.issueCount}</p>
        </div>

        {/* 10. openvswitch.openvswitch */}
        <div className="repository-wise-issue-data">
          <h2>{issueData.OPENVSWITCH_OPEN_ISSUES.name}</h2>
          <p>
            Issues opened: {issueData.OPENVSWITCH_OPEN_ISSUES.issues.totalCount}
          </p>
          <p>
            Issues closed:{" "}
            {issueData.OPENVSWITCH_CLOSED_ISSUES.issues.totalCount}
          </p>
          <p>Open PRs: {prData.OPENVSWITCH_OPEN_PR.issueCount}</p>
          <p>Merged PRs: {prData.OPENVSWITCH_MERGED_PR.issueCount}</p>
        </div>

        {/* 11. community.yang */}
        <div className="repository-wise-issue-data">
          <h2>{issueData.COMMUNITY_YANG_OPEN_ISSUES.name}</h2>
          <p>
            Issues opened:{" "}
            {issueData.COMMUNITY_YANG_OPEN_ISSUES.issues.totalCount}
          </p>
          <p>
            Issues closed:{" "}
            {issueData.COMMUNITY_YANG_CLOSED_ISSUES.issues.totalCount}
          </p>
          <p>Open PRs: {prData.COMMUNITY_YANG_OPEN_PR.issueCount}</p>
          <p>Merged PRs: {prData.COMMUNITY_YANG_MERGED_PR.issueCount}</p>
        </div>

        {/* 12. ansible.utils */}
        <div className="repository-wise-issue-data">
          <h2>{issueData.ANSIBLE_UTILS_OPEN_ISSUES.name}</h2>
          <p>
            Issues opened:{" "}
            {issueData.ANSIBLE_UTILS_OPEN_ISSUES.issues.totalCount}
          </p>
          <p>
            Issues closed:{" "}
            {issueData.ANSIBLE_UTILS_CLOSED_ISSUES.issues.totalCount}
          </p>
          <p>Open PRs: {prData.ANSIBLE_UTILS_OPEN_PR.issueCount}</p>
          <p>Merged PRs: {prData.ANSIBLE_UTILS_MERGED_PR.issueCount}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="repository-wise-details">
      <h3>Details</h3>
      <div className="details">{displayDetails()}</div>
    </div>
  );
};

export default RepositoryWiseDetails;
