import "./loader.css";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  ISSUES_AND_PR,
  ISSUES_AND_PR_AVERAGE,
  ISSUES_AND_PR_SPLITUP,
} from "../../queries/analytics_queries";
import { groupByMonth } from "./groupByMonth";
import LineGraph from "./LineGraph";
import { assembleData } from "../../utils/assemble-data";
import BarGraph from "./BarGraph";
import { Loader } from "rsuite";
import { Doughnut } from "react-chartjs-2";
import DoughnutGraph from "./DoughnutGraph";
import { calculateAverageDays } from "./calculateAverageDays";
import { Card } from "antd";

const instance = (
  <div id="loaderInverseWrapper" style={{ height: 200 }}>
    <Loader center content="loading..." />
  </div>
);

const RepositoryAnalytics = ({ selectedRepository }) => {
  const [mergedIssueData, setMergedIssueData] = useState(null);
  const [mergedPRData, setMergedPRData] = useState(null);

  const [issuesGroupedByMonth, setIssuesGroupedByMonth] = useState(null);
  const [prsGroupedByMonth, setPRSGroupedByMonth] = useState(null);

  const [totalOpenIssueCount, setTotalOpenIssueCount] = useState(null);
  const [totalCloseIssueCount, setTotalCloseIssueCount] = useState(null);
  const [totalOpenPRCount, setTotalOpenPRCount] = useState(null);
  const [totalMergePRCount, setTotalMergePRCount] = useState(null);

  const [averageDaysIssueClosed, setAverageDaysIssueClosed] = useState(null);
  const [averageDaysPRMerged, setAverageDaysPRMerged] = useState(null);

  const {
    loading: allDataLoading,
    error: allDataError,
    data: allDataData,
  } = useQuery(ISSUES_AND_PR, {
    variables: { repository: selectedRepository },
  });

  const {
    loading: splitupDataLoading,
    error: splitupDataError,
    data: splitupDataData,
  } = useQuery(ISSUES_AND_PR_SPLITUP, {
    variables: { repository: selectedRepository },
  });

  const {
    loading: averageDataLoading,
    erorr: averageDataError,
    data: averageDataData,
  } = useQuery(ISSUES_AND_PR_AVERAGE, {
    variables: { repository: selectedRepository },
  });

  useEffect(() => {
    let openIssuesGroupedByMonth,
      closedIssuesGroupedByMonth,
      openPRGroupedByMonth,
      mergedPRGroupedByMonth,
      averageIssueCloseDate,
      averagePRMergeDate,
      issuesGroupedByMonth,
      prGroupedByMonth;

    if (allDataData) {
      issuesGroupedByMonth = groupByMonth(allDataData.repository.issues.nodes);
      prGroupedByMonth = groupByMonth(
        allDataData.repository.pullRequests.nodes
      );
    }

    if (averageDataData) {
      console.log(averageDataData);
      averageIssueCloseDate = calculateAverageDays(
        averageDataData.ISSUE_AVG.issues.nodes
      );
      averagePRMergeDate = calculateAverageDays(
        averageDataData.PR_AVG.pullRequests.nodes
      );
      setAverageDaysIssueClosed(averageIssueCloseDate);
      setAverageDaysPRMerged(averagePRMergeDate);
      // console.log("ISSUE AVG: ", averageIssueCloseDate);
      // console.log("PR AVG: ", averagePRMergeDate);
    }

    if (splitupDataData) {
      openIssuesGroupedByMonth = groupByMonth(
        splitupDataData.OPEN_ISSUES.issues.nodes
      );
      closedIssuesGroupedByMonth = groupByMonth(
        splitupDataData.CLOSED_ISSUES.issues.nodes
      );
      openPRGroupedByMonth = groupByMonth(
        splitupDataData.OPEN_PR.pullRequests.nodes
      );
      mergedPRGroupedByMonth = groupByMonth(
        splitupDataData.MERGED_PR.pullRequests.nodes
      );

      if (!splitupDataLoading) {
        const resultForIssues =
          openIssuesGroupedByMonth.length > closedIssuesGroupedByMonth.length
            ? assembleData(
                openIssuesGroupedByMonth,
                closedIssuesGroupedByMonth,
                "open"
              )
            : assembleData(
                closedIssuesGroupedByMonth,
                openIssuesGroupedByMonth,
                "closed"
              );

        const resultForPRS =
          openPRGroupedByMonth.length > mergedPRGroupedByMonth.length
            ? assembleData(openPRGroupedByMonth, mergedPRGroupedByMonth, "open")
            : assembleData(
                mergedPRGroupedByMonth,
                openPRGroupedByMonth,
                "merged"
              );
        setIssuesGroupedByMonth(issuesGroupedByMonth);
        setPRSGroupedByMonth(prGroupedByMonth);
        setMergedIssueData(resultForIssues);
        setMergedPRData(resultForPRS);

        setTotalOpenIssueCount(splitupDataData.OPEN_ISSUES.issues.totalCount);
        setTotalCloseIssueCount(
          splitupDataData.CLOSED_ISSUES.issues.totalCount
        );
        setTotalOpenPRCount(splitupDataData.OPEN_PR.pullRequests.totalCount);
        setTotalMergePRCount(splitupDataData.MERGED_PR.pullRequests.totalCount);
        // console.log("TOTAL COUNT", splitupDataData);
      }
    }
  }, [
    splitupDataLoading,
    allDataLoading,
    averageDataLoading,
    allDataData,
    splitupDataData,
    averageDataData,
  ]);

  return (
    <div>
      <h2>{selectedRepository} Analytics</h2>
      {allDataLoading !== splitupDataLoading ? (
        <Loader size="lg" />
      ) : (
        // <div> Loading...</div>
        <div className="overall-graphs">
          {issuesGroupedByMonth && (
            <LineGraph
              dataGroupedByMonth={issuesGroupedByMonth}
              label="Issues"
              heading="Issues Trend"
            />
          )}
          {prsGroupedByMonth && (
            <LineGraph
              dataGroupedByMonth={prsGroupedByMonth}
              label="Pull Requests"
              heading="Pull Requests Trend"
            />
          )}
          {mergedIssueData && (
            <BarGraph
              dataGroupedByMonth={mergedIssueData}
              label1="Open Issue"
              label2="Closed Issue"
              heading="Issue Categories"
            />
          )}
          {mergedPRData && (
            <BarGraph
              dataGroupedByMonth={mergedPRData}
              label1="Open PR"
              label2="Merged PR"
              heading="Pull Request Categories"
            />
          )}
          {totalOpenIssueCount && totalCloseIssueCount && (
            <DoughnutGraph
              heading="Issue Chart"
              label1="Open Issues"
              data1={totalOpenIssueCount}
              label2="Close Issues"
              data2={totalCloseIssueCount}
            />
          )}
          {totalOpenPRCount && totalMergePRCount && (
            <DoughnutGraph
              heading="Pull Request Chart"
              label1="Open PRs"
              data1={totalOpenPRCount}
              label2="Merge PRs"
              data2={totalMergePRCount}
            />
          )}
          <div className="average-informations">
            {averageDaysIssueClosed && (
              <Card
                className="issue-close-average"
                title="Average days to close an issue"
              >
                <h2>{averageDaysIssueClosed}</h2>
              </Card>
            )}
            {averageDaysPRMerged && (
              <Card
                className="pr-merge-average"
                title="Average days to merge a PR"
              >
                <h2>{averageDaysPRMerged}</h2>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RepositoryAnalytics;
