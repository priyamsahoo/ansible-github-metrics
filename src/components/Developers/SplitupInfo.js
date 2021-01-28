import { useQuery } from "@apollo/client";
import { DEVELOPER_ISSUE } from "../../queries/developer_issue_query";
import RepositoryWiseDetails from "./RepositoryWiseDetails";

const SpiltupInfo = ({ selectedDeveloper }) => {
  const { loading, error, data } = useQuery(DEVELOPER_ISSUE, {
    variables: { userName: selectedDeveloper },
  });

  // console.log(data);

  return (
    <div className="splitup-info">
      <h2>Repository wise details of {selectedDeveloper}</h2>
      {data && <RepositoryWiseDetails issueData={data} />}
    </div>
  );
};

export default SpiltupInfo;
