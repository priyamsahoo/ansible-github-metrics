import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { DEVELOPER_DETAILS } from "../../queries/developer_queries";

const OverallInfo = ({ selectedDeveloper }) => {
  const { loading, error, data } = useQuery(DEVELOPER_DETAILS, {
    variables: { userName: selectedDeveloper },
    fetchPolicy: "cache-and-network",
  });

  const displayDetails = () => {
    return (
      <div>
        {/* <p>{JSON.stringify(data)}</p> */}
        <div className="profile-info">
          <img src={data.user.avatarUrl}></img>
          <h1>
            <a href={data.user.url} target="_blank">
              {data.user.name}
            </a>
          </h1>
          <p>{data.user.login}</p>
        </div>
        <div className="collection-contributions">
          <div className="total-contributions">
            <h2>Total contributions:</h2>
            <h1>
              {
                data.user.ansibleCollections.contributionCalendar
                  .totalContributions
              }
            </h1>
          </div>
          <div className="contribution-splits">
            <h2>Commits made:</h2>
            <h1>{data.user.ansibleCollections.totalCommitContributions}</h1>
          </div>
          <div className="contribution-splits">
            <h2>Issues raised and solved:</h2>
            <h1>{data.user.ansibleCollections.totalIssueContributions}</h1>
          </div>
          <div className="contribution-splits">
            <h2>Pull requests:</h2>
            <h1>
              {data.user.ansibleCollections.totalPullRequestContributions}
            </h1>
          </div>
          <div className="contribution-splits">
            <h2>Pull requests reviewed:</h2>
            <h1>
              {data.user.ansibleCollections.totalPullRequestReviewContributions}
            </h1>
          </div>
        </div>
        <div className="contributionInfo"></div>
      </div>
    );
  };

  return (
    <div className="overall-info">
      {/* <h3>Total contributions: {collectionInfo}</h3> */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && displayDetails()}
    </div>
  );
};

export default OverallInfo;
