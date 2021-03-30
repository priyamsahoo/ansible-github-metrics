import { useQuery } from "@apollo/client";
import { Button, Typography } from "antd";
import { PR } from "../../queries/collections_queries";
import DataTable from "./DataTable";
import { PR_COLUMNS } from "./PRColumns";

const ACPullRequests = ({ owner, repository }) => {
  // Query for obtaining pull requests
  const { loading, error, data } = useQuery(PR, {
    variables: { repositoryName: repository, ownerName: owner },
  });
  // console.log(data);

  return (
    <div className="ac-pull-requests">
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {data && (
        <DataTable
          title="Pull Requests Table"
          tag="Pull requests"
          repositoryName={data.repository.nameWithOwner}
          tableData={data.repository.pullRequests.edges}
          totalCount={data.repository.pullRequests.totalCount}
          tableColumns={PR_COLUMNS}
          tableDateRange={{
            end: data.repository.pullRequests.edges[0].node.createdAt,
            start:
              data.repository.pullRequests.edges[
                data.repository.pullRequests.edges.length - 1
              ].node.createdAt,
          }}
        />
      )}
    </div>
  );
};
export default ACPullRequests;
