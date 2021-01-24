import { useQuery } from "@apollo/client";
import { ISSUES } from "../queries/queries";
import IssueTable from "./IssueTable";
import { useState } from "react";

const ACIssues = ({ repository }) => {
  // const [repository, setRepository] = useState("cisco.nxos");

  const { loading, error, data, refetch } = useQuery(ISSUES, {
    variables: { repositoryName: repository },
  });
  // console.log(data);

  return (
    <div className="ac-issues">
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {data && (
        <IssueTable
          name={data.repository.name}
          issues={data.repository.issues.edges}
          count={data.repository.issues.edges.length}
        />
      )}
    </div>
  );
};
export default ACIssues;
