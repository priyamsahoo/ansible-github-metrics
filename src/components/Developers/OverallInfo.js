import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  DEVELOPER_DETAILS,
  DEVELOPER_CONTRIBUTIONS,
} from "../../queries/developer_queries";
import * as moment from "moment";
// import { Card, Input } from "reactstrap";
import { useState } from "react";
import { Card, Divider, Select, Skeleton } from "antd";
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
    moment().subtract(1, "month").format("YYYY-MM-DD").toString() +
      ".." +
      moment().format("YYYY-MM-DD").toString()
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

  const { Option, OptGroup } = Select;

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
              style={{ width: 180 }}
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
                  moment().subtract(1, "year").format("YYYY-MM-DD").toString() +
                  ".." +
                  moment().format("YYYY-MM-DD").toString()
                }
              >
                Last year
              </Option>
              <OptGroup label="Current year">
                <Option
                  value={
                    moment()
                      .month("Jan")
                      .startOf("month")
                      .format("YYYY-MM-DD")
                      .toString() +
                    ".." +
                    moment()
                      .month("Mar")
                      .endOf("month")
                      .format("YYYY-MM-DD")
                      .toString()
                  }
                >
                  {`${moment()
                    .month("Jan")
                    .format("MMM 'YY")} - ${moment()
                    .month("Mar")
                    .format("MMM 'YY")}`}
                </Option>
                <Option
                  value={
                    moment()
                      .month("Apr")
                      .startOf("month")
                      .format("YYYY-MM-DD")
                      .toString() +
                    ".." +
                    moment()
                      .month("Jun")
                      .endOf("month")
                      .format("YYYY-MM-DD")
                      .toString()
                  }
                >
                  {`${moment()
                    .month("Apr")
                    .format("MMM 'YY")} - ${moment()
                    .month("Jun")
                    .format("MMM 'YY")}`}
                </Option>
                <Option
                  value={
                    moment()
                      .month("Jul")
                      .startOf("month")
                      .format("YYYY-MM-DD")
                      .toString() +
                    ".." +
                    moment()
                      .month("Sep")
                      .endOf("month")
                      .format("YYYY-MM-DD")
                      .toString()
                  }
                >
                  {`${moment()
                    .month("Jul")
                    .format("MMM 'YY")} - ${moment()
                    .month("Sep")
                    .format("MMM 'YY")}`}
                </Option>
                <Option
                  value={
                    moment()
                      .month("Oct")
                      .startOf("month")
                      .format("YYYY-MM-DD")
                      .toString() +
                    ".." +
                    moment()
                      .month("Dec")
                      .endOf("month")
                      .format("YYYY-MM-DD")
                      .toString()
                  }
                >
                  {`${moment()
                    .month("Oct")
                    .format("MMM 'YY")} - ${moment()
                    .month("Dec")
                    .format("MMM 'YY")}`}
                </Option>
              </OptGroup>
            </Select>
          </Card>
        </div>
        {contributionLoading && <Skeleton />}
        {contributionError && <p>{contributionError}</p>}
        {contributionData && !contributionLoading && (
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
            <Card
              className="contribution-splits"
              title="PRs Opened"
              size="small"
            >
              {/* <h2>Open pull requests:</h2> */}
              <h1>{contributionData.OPEN_PR.issueCount}</h1>
            </Card>
            <Card
              className="contribution-splits"
              title="PRs merged"
              size="small"
            >
              {/* <h2>Merged pull requests:</h2> */}
              <h1>{contributionData.MERGED_PR.issueCount}</h1>
            </Card>
          </div>
        )}
        <div className="contributionInfo"></div>
      </div>
    );
  };

  return (
    <div className="overall-info">
      {/* <h3>Total contributions: {collectionInfo}</h3> */}
      {infoLoading && <p>Loading...</p>}
      {infoError && <p>{infoError}</p>}
      {infoData && displayDetails()}
    </div>
  );
};

export default OverallInfo;
