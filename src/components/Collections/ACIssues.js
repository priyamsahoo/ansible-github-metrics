import { useQuery } from "@apollo/client";
import { Button, Typography } from "antd";
import { useCallback } from "react";
import { ISSUES } from "../../queries/collections_queries";
import DataTable from "./DataTable";
import { ISSUE_COLUMNS } from "./IssueColumns";
import moment from "moment";

const ACIssues = ({ owner, repository }) => {
  // Query for obtaining issues
  const { loading, error, data, fetchMore } = useQuery(ISSUES, {
    variables: { repositoryName: repository, ownerName: owner, cursor: null },
  });
  // console.log(data);

  const handleClick = () => {
    const { hasNextPage, endCursor } = data.repository.issues.pageInfo;
    // console.log(endCursor);

    if (hasNextPage) {
      fetchMore({
        variables: { cursor: endCursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // console.log("Prev Result from Issues", previousResult);
          // console.log("Fetchmore Result from Issues", fetchMoreResult);

          // if (!fetchMoreResult) {
          //   return previousResult;
          // }

          // return {
          //   repository: {
          //     ...data.repository,
          //     issues: {
          //       ...data.repository.issues,
          //       edges: [
          //         ...data.repository.issues.edges,
          //         ...fetchMoreResult.repository.issues.edges,
          //       ],
          //     },
          //   },
          // };

          fetchMoreResult.repository.issues.edges = [
            ...data.repository.issues.edges,
            ...fetchMoreResult.repository.issues.edges,
          ];

          return fetchMoreResult;
        },
      });
    }
  };

  const { Link } = Typography;

  return (
    <div className="ac-issues">
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {data && (
        <>
          <h2>Issues Table</h2>
          <Button
            disabled={!data.repository.issues.pageInfo.hasNextPage}
            onClick={handleClick}
          >
            Load More
          </Button>
          <DataTable
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
        </>
      )}
    </div>
  );
};
export default ACIssues;
