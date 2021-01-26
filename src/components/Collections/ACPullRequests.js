import { useQuery } from "@apollo/client";
import { PR } from "../../queries/queries";
import PRTable from "./PRTable";
import { useState } from "react";

const ACPullRequests = ({ repository }) => {
  // const [repository, setRepository] = useState("cisco.nxos");

  const { loading, error, data, refetch } = useQuery(PR, {
    variables: { repositoryName: repository },
  });
  // console.log(data);

  const name = data ? data.repository.name : null;
  const count = data ? data.repository.pullRequests.edges.length : 0;

  return (
    <div className="ac-pull-requests">
      <h2>Repository: {name}</h2>
      <h3>Total PRs: {count >= 100 ? "100+" : count}</h3>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {data && <PRTable pr={data.repository.pullRequests.edges} />}
    </div>
  );
};
export default ACPullRequests;
