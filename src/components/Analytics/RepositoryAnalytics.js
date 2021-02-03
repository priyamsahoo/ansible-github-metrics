import { useQuery } from "@apollo/client";
import {
  ISSUES_AND_PR,
  ISSUES_AND_PR_SPLITUP,
} from "../../queries/analytics_queries";
import { groupByMonth } from "./groupByMonth";
import LineGraph from "./LineGraph";
import lodash from "lodash";
import BarGraph from "./BarGraph";

const RepositoryAnalytics = ({ selectedRepository }) => {
  const {
    loading: allDataLoading,
    error: allDataError,
    data: allDataData,
  } = useQuery(ISSUES_AND_PR, {
    variables: { repository: selectedRepository },
  });

  if (allDataData) {
    var issuesGroupedByMonth = groupByMonth(
      allDataData.repository.issues.nodes
    );
    var prGroupedByMonth = groupByMonth(
      allDataData.repository.pullRequests.nodes
    );
  }

  const {
    loading: splitupDataLoading,
    error: splitupDataError,
    data: splitupDataData,
  } = useQuery(ISSUES_AND_PR_SPLITUP, {
    variables: { repository: selectedRepository },
  });

  if (splitupDataData) {
    var openIssuesGroupedByMonth = groupByMonth(
      splitupDataData.OPEN_ISSUES.issues.nodes
    );
    var closedIssuesGroupedByMonth = groupByMonth(
      splitupDataData.CLOSED_ISSUES.issues.nodes
    );
    var openPRGroupedByMonth = groupByMonth(
      splitupDataData.OPEN_PR.pullRequests.nodes
    );
    var mergedPRGroupedByMonth = groupByMonth(
      splitupDataData.MERGED_PR.pullRequests.nodes
    );
  }

  console.log("open issues", openIssuesGroupedByMonth);
  console.log("closed issues", closedIssuesGroupedByMonth);
  console.log("open pr", openPRGroupedByMonth);
  console.log("merged pr", mergedPRGroupedByMonth);

  return (
    <div>
      <h2>{selectedRepository} Analytics</h2>
      <div className="overall-graphs">
        {issuesGroupedByMonth && (
          <LineGraph dataGroupedByMonth={issuesGroupedByMonth} label="Issues" />
        )}
        {prGroupedByMonth && (
          <LineGraph
            dataGroupedByMonth={prGroupedByMonth}
            label="Pull Requests"
          />
        )}
        {/* {h && <BarGraph dataGroupedByMonth={h} label="Pull Requests" />} */}
      </div>
    </div>
  );
};

export default RepositoryAnalytics;
