import { useQuery } from "@apollo/client";
import { Button } from "antd";
import { ISSUES } from "../../queries/collections_queries";
import DataTable from "./DataTable";
import { ISSUE_COLUMNS } from "./IssueColumns";

const ACIssues = ({ owner, repository }) => {
  // Query for obtaining issues
  const { loading, error, data } = useQuery(ISSUES, {
    variables: { repositoryName: repository, ownerName: owner },
  });
  // console.log(data);

  return (
    <div className="ac-issues">
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {data && (
        <DataTable
          title="Issues Table"
          tag="Issues"
          repositoryName={data.repository.nameWithOwner}
          tableData={data.repository.issues.edges}
          totalCount={data.repository.issues.totalCount}
          tableColumns={ISSUE_COLUMNS}
          tableDateRange={{
            end: data.repository.issues.edges[0].node.createdAt,
            start:
              data.repository.issues.edges[
                data.repository.issues.edges.length - 1
              ].node.createdAt,
          }}
        />
      )}
    </div>
  );
};
export default ACIssues;
