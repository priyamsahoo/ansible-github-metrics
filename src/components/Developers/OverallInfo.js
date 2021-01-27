import { useQuery } from "@apollo/client";
import { DEVELOPER_DETAILS } from "../../queries/developer_queries";

const OverallInfo = ({ selectedDeveloper }) => {
  const { loading, error, data } = useQuery(DEVELOPER_DETAILS, {
    variables: { userName: selectedDeveloper },
  });

  const displayDetails = () => {
    return (
      <div>
        {/* <p>{JSON.stringify(data)}</p> */}
        <div className="profile-info">
          <img src={data.user.avatarUrl}></img>
          <h1>{data.user.name}</h1>
          <p>{data.user.login}</p>
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
