import "./loader.css";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  ISSUES_AND_PR,
  ISSUES_AND_PR_SPLITUP,
} from "../../queries/analytics_queries";
import { groupByMonth } from "./groupByMonth";
import LineGraph from "./LineGraph";
import { assembleData } from "../../utils/assemble-data";
import BarGraph from "./BarGraph";
import { Loader } from "rsuite";

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

  useEffect(() => {
    let openIssuesGroupedByMonth,
      closedIssuesGroupedByMonth,
      openPRGroupedByMonth,
      mergedPRGroupedByMonth,
      issuesGroupedByMonth,
      prGroupedByMonth;

    if (allDataData) {
      issuesGroupedByMonth = groupByMonth(allDataData.repository.issues.nodes);
      prGroupedByMonth = groupByMonth(
        allDataData.repository.pullRequests.nodes
      );
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
      }
    }
  }, [splitupDataLoading, allDataLoading, allDataData, splitupDataData]);

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
        </div>
      )}
    </div>
  );
};

export default RepositoryAnalytics;
