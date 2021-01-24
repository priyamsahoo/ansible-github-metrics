import { useQuery } from "@apollo/client";
import { PR } from "../queries/queries";
import PRTable from "./PRTable";
import { useState } from "react";

const ACPullRequests = ({ repository }) => {
  // const [repository, setRepository] = useState("cisco.nxos");

  const { loading, error, data, refetch } = useQuery(PR, {
    variables: { repositoryName: repository },
  });
  // console.log(data);

  return (
    <div className="ac-pull-requests">
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {data && (
        <PRTable
          name={data.repository.name}
          pr={data.repository.pullRequests.edges}
          count={data.repository.pullRequests.edges.length}
        />
      )}
    </div>
  );
};
export default ACPullRequests;
