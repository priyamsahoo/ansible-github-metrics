import { useQuery } from "@apollo/client";
import { COLLECTION_INSIGHTS } from "../../queries/queries";

const CollectionInsights = ({ repository }) => {
  const { loading, error, data } = useQuery(COLLECTION_INSIGHTS, {
    variables: { repositoryName: repository },
  });

  console.log(data);

  // let openIssues = data.repository.issues.totalCount;

  return (
    <div className="collection-insights">
      <h2>Collection Insights: {repository}</h2>
      <br></br>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {data && (
        <div className="information">
          <p>Open Issues: {data.repository.openIssues.totalCount}</p>
          <p>Closed Issues: {data.repository.closedIssues.totalCount}</p>
          <br></br>
          <p>Open PRs: {data.repository.openPRs.totalCount}</p>
          <p>Closed PRs: {data.repository.closedPRs.totalCount}</p>
          <p>Merged PRs: {data.repository.mergedPRs.totalCount}</p>
        </div>
      )}
    </div>
  );
};

export default CollectionInsights;
