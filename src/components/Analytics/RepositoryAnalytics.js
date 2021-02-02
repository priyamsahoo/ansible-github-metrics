import { useQuery } from "@apollo/client";
import { ISSUES_AND_PR } from "../../queries/analytics_queries";
import { groupByMonth } from "./groupByMonth";
import LineGraph from "./ChartTest";

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
      </div>
    </div>
  );
};

export default RepositoryAnalytics;
