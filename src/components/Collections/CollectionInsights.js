import { useQuery } from "@apollo/client";
import { COLLECTION_INSIGHTS } from "../../queries/queries";
import { Statistic, Card } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const CollectionInsights = ({ repository }) => {
  const { loading, error, data } = useQuery(COLLECTION_INSIGHTS, {
    variables: { repositoryName: repository },
  });

  console.log(data);

  // let openIssues = data.repository.issues.totalCount;

  const displayDetails = () => {
    return (
      <div className="information">
        <div className="information-inner">
          <div className="information-numericals">
            <p>Open Issues: {data.repository.openIssues.totalCount}</p>
            <p>Closed Issues: {data.repository.closedIssues.totalCount}</p>
          </div>
          <div className="information-percentage">
            {/* <h3>
              {(
                (data.repository.closedIssues.totalCount /
                  (data.repository.openIssues.totalCount +
                    data.repository.closedIssues.totalCount)) *
                100
              ).toFixed(2)}
              %
            </h3> */}
            {/* <h4>Closed issues</h4> */}
            <Card>
              <Statistic
                title="Closed Issues"
                value={
                  (data.repository.closedIssues.totalCount /
                    (data.repository.openIssues.totalCount +
                      data.repository.closedIssues.totalCount)) *
                  100
                }
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </div>
        </div>
        <br></br>
        <div className="information-inner">
          <div className="information-numericals">
            <p>Open PRs: {data.repository.openPRs.totalCount}</p>
            <p>Closed PRs: {data.repository.closedPRs.totalCount}</p>
            <p>Merged PRs: {data.repository.mergedPRs.totalCount}</p>
          </div>
          <div className="information-percentage">
            {/* <h3>
              {(
                (data.repository.mergedPRs.totalCount /
                  (data.repository.openPRs.totalCount +
                    data.repository.mergedPRs.totalCount)) *
                100
              ).toFixed(2)}
              %
            </h3>
            <h4>Merged PRs</h4> */}
            <Card>
              <Statistic
                title="Merged PRs"
                value={
                  (data.repository.mergedPRs.totalCount /
                    (data.repository.openPRs.totalCount +
                      data.repository.mergedPRs.totalCount)) *
                  100
                }
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="collection-insights">
      <h2>Collection Insights: {repository}</h2>
      <br></br>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {data && displayDetails()}
    </Card>
  );
};

export default CollectionInsights;
