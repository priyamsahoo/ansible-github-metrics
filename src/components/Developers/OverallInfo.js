import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  DEVELOPER_DETAILS,
  DEVELOPER_CONTRIBUTIONS,
} from "../../queries/developer_queries";
import * as moment from "moment";
import { Input } from "reactstrap";
import { useState } from "react";

const OverallInfo = ({ selectedDeveloper }) => {
  let repository_list = [
    "ansible-collections/cisco.nxos",
    "ansible-collections/cisco.ios",
    "ansible-collections/cisco.iosxr",
    "ansible-collections/arista.eos",
    "ansible-collections/vyos.vyos",
    "ansible-collections/junipernetworks.junos",
    "ansible-collections/cisco.asa",
    "ansible-collections/ansible.netcommon",
    "ansible-collections/frr.frr",
    "ansible-collections/openvswitch.openvswitch",
    "ansible-collections/community.yang",
    "ansible-collections/ansible.utils",
  ];

  repository_list = repository_list.map((item) => "repo:" + item);

  const repoQueryString = repository_list.join(" ");
  // console.log(repoQueryString);

  const authorQueryString = selectedDeveloper;

  const [dateQueryString, setDateQueryString] = useState(
    `<=${moment().format("YYYY-MM-DD").toString()}`
  );

  const issueOpenQueryString = `${repoQueryString} type:issue is:open author:${selectedDeveloper} updated:${dateQueryString}`;
  const issueClosedQueryString = `${repoQueryString} type:issue is:closed author:${selectedDeveloper} updated:${dateQueryString}`;
  const prOpenQueryString = `${repoQueryString} type:pr is:open author:${selectedDeveloper} updated:${dateQueryString}`;
  const prMergedQueryString = `${repoQueryString} type:pr is:merged author:${selectedDeveloper} updated:${dateQueryString}`;
  const totalContributionQueryString = `${repoQueryString} author:${selectedDeveloper} updated:${dateQueryString}`;

  const {
    loading: contributionLoading,
    error: contributionError,
    data: contributionData,
  } = useQuery(DEVELOPER_CONTRIBUTIONS, {
    variables: {
      queryStringIssueOpen: issueOpenQueryString,
      queryStringIssueClosed: issueClosedQueryString,
      queryStringPROpen: prOpenQueryString,
      queryStringPRMerged: prMergedQueryString,
      queryStringTotal: totalContributionQueryString,
    },
    fetchPolicy: "cache-and-network",
  });

  console.log(contributionData);

  const { loading: infoLoading, error: infoError, data: infoData } = useQuery(
    DEVELOPER_DETAILS,
    {
      variables: { userName: selectedDeveloper },
      fetchPolicy: "cache-and-network",
    }
  );

  // console.log(dateQueryString);

  const displayDetails = () => {
    return (
      <div>
        <div className="profile-info">
          <img src={infoData.user.avatarUrl}></img>
          <h1>
            <a href={infoData.user.url} target="_blank">
              {infoData.user.name}
            </a>
          </h1>
          <p>{infoData.user.login}</p>
          <label>Period: </label>
          <Input
            type="select"
            defaultValue={dateQueryString}
            onChange={(e) => {
              setDateQueryString(e.target.value);
            }}
          >
            <option value={`<=${moment().format("YYYY-MM-DD").toString()}`}>
              Overall
            </option>
            <option
              value={
                moment().subtract(7, "days").format("YYYY-MM-DD").toString() +
                ".." +
                moment().format("YYYY-MM-DD").toString()
              }
            >
              Last week
            </option>
            <option
              value={
                moment().subtract(1, "month").format("YYYY-MM-DD").toString() +
                ".." +
                moment().format("YYYY-MM-DD").toString()
              }
            >
              Last month
            </option>
            <option
              value={
                moment().subtract(7, "month").format("YYYY-MM-DD").toString() +
                ".." +
                moment().format("YYYY-MM-DD").toString()
              }
            >
              Last 6 months
            </option>
            <option
              value={
                moment().subtract(1, "year").format("YYYY-MM-DD").toString() +
                ".." +
                moment().format("YYYY-MM-DD").toString()
              }
            >
              Last year
            </option>
          </Input>
        </div>
        <div className="collection-contributions">
          <div className="total-contributions">
            <h2>Total contributions:</h2>
            <h1>{contributionData.TOTAL_CONTRIBUTION.issueCount}</h1>
          </div>
          <div className="contribution-splits">
            <h2>Issues opened: </h2>
            <h1>{contributionData.OPEN_ISSUES.issueCount}</h1>
          </div>
          <div className="contribution-splits">
            <h2>Issues closed:</h2>
            <h1>{contributionData.CLOSED_ISSUES.issueCount}</h1>
          </div>
          <div className="contribution-splits">
            <h2>Open pull requests:</h2>
            <h1>{contributionData.OPEN_PR.issueCount}</h1>
          </div>
          <div className="contribution-splits">
            <h2>Merged pull requests:</h2>
            <h1>{contributionData.MERGED_PR.issueCount}</h1>
          </div>
        </div>
        <div className="contributionInfo"></div>
      </div>
    );
  };

  return (
    <div className="overall-info">
      {/* <h3>Total contributions: {collectionInfo}</h3> */}
      {infoLoading && <p>Loading...</p>}
      {infoError && <p>{infoError}</p>}
      {infoData && contributionData && displayDetails()}
    </div>
  );
};

export default OverallInfo;
