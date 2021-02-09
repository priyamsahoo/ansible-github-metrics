import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  DEVELOPER_DETAILS,
  DEVELOPER_CONTRIBUTIONS,
} from "../../queries/developer_queries";
import * as moment from "moment";
// import { Card, Input } from "reactstrap";
import { useState } from "react";
import { Card, Select } from "antd";
import { REPOSITORIES } from "../../data/repositories";

const OverallInfo = ({ selectedDeveloper }) => {
  let repositoryList = REPOSITORIES.map(
    (repository) => `${repository.owner}/${repository.repo}`
  );

  repositoryList = repositoryList.map((item) => "repo:" + item);

  const repoQueryString = repositoryList.join(" ");
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

  const { Option } = Select;

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

          <Card className="period-dropdown">
            <label>Period: </label>
            <Select
              // type="select"
              style={{ width: 120 }}
              defaultValue={dateQueryString}
              onChange={(e) => {
                // console.log(e);
                setDateQueryString(e);
              }}
            >
              <Option value={`<=${moment().format("YYYY-MM-DD").toString()}`}>
                Overall
              </Option>
              <Option
                value={
                  moment().subtract(7, "days").format("YYYY-MM-DD").toString() +
                  ".." +
                  moment().format("YYYY-MM-DD").toString()
                }
              >
                Last week
              </Option>
              <Option
                value={
                  moment()
                    .subtract(1, "month")
                    .format("YYYY-MM-DD")
                    .toString() +
                  ".." +
                  moment().format("YYYY-MM-DD").toString()
                }
              >
                Last month
              </Option>
              <Option
                value={
                  moment()
                    .subtract(7, "month")
                    .format("YYYY-MM-DD")
                    .toString() +
                  ".." +
                  moment().format("YYYY-MM-DD").toString()
                }
              >
                Last 6 months
              </Option>
              <Option
                value={
                  moment().subtract(1, "year").format("YYYY-MM-DD").toString() +
                  ".." +
                  moment().format("YYYY-MM-DD").toString()
                }
              >
                Last year
              </Option>
            </Select>
          </Card>
        </div>
        <div className="collection-contributions">
          <Card
            className="total-contributions"
            title="Total contribution"
            size="small"
          >
            <h1>{contributionData.TOTAL_CONTRIBUTION.issueCount}</h1>
          </Card>
          <Card
            className="contribution-splits"
            title="Issues opened"
            size="small"
          >
            {/* <h2>Issues opened: </h2> */}
            <h1>{contributionData.OPEN_ISSUES.issueCount}</h1>
          </Card>
          <Card
            className="contribution-splits"
            title="Issues closed"
            size="small"
          >
            {/* <h2>Issues closed:</h2> */}
            <h1>{contributionData.CLOSED_ISSUES.issueCount}</h1>
          </Card>
          <Card className="contribution-splits" title="PRs Opened" size="small">
            {/* <h2>Open pull requests:</h2> */}
            <h1>{contributionData.OPEN_PR.issueCount}</h1>
          </Card>
          <Card className="contribution-splits" title="PRs merged" size="small">
            {/* <h2>Merged pull requests:</h2> */}
            <h1>{contributionData.MERGED_PR.issueCount}</h1>
          </Card>
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
