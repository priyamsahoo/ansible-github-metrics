import { useQuery } from "@apollo/client";
import { TEST } from "../../queries/analytics_queries";
import { groupByMonth } from "./groupByMonth";
import ChartTest from "./ChartTest";

const RepositoryAnalytics = ({ selectedRepository }) => {
  const { loading, error, data } = useQuery(TEST, {
    variables: { repository: selectedRepository },
  });

  if (data) {
    var dataGroupedByMonth = groupByMonth(data.repository.issues.nodes);
  }

  return (
    <div>
      <h2>{selectedRepository} Analytics</h2>
      {dataGroupedByMonth && (
        <ChartTest dataGroupedByMonth={dataGroupedByMonth} />
      )}
    </div>
  );
};

export default RepositoryAnalytics;
