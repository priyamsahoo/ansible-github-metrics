import { useQuery } from "@apollo/client";
import { ISSUES } from "../../queries/queries";
import IssueTable from "./IssueTable";
import { useState } from "react";

const ACIssues = ({ repository }) => {
  // const [repository, setRepository] = useState("cisco.nxos");

  const { loading, error, data, refetch } = useQuery(ISSUES, {
    variables: { repositoryName: repository },
  });
  // console.log(data);

  const name = data ? data.repository.name : null;
  const count = data ? data.repository.issues.edges.length : 0;

  return (
    <div className="ac-issues">
      <h2>Issue Table: {name}</h2>
      {/* <h3>Total Issues: {count >= 100 ? "100+" : count}</h3> */}
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {data && <IssueTable issues={data.repository.issues.edges} />}
    </div>
  );
};
export default ACIssues;
