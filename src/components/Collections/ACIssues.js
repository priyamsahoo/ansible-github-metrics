import { InMemoryCache, useQuery } from "@apollo/client";
import { Button, Typography } from "antd";
import { useCallback } from "react";
import { ISSUES } from "../../queries/collections_queries";
import DataTable from "./DataTable";
import { ISSUE_COLUMNS } from "./IssueColumns";
import moment from "moment";
import { useEffect } from "react";
import { relayStylePagination } from "@apollo/client/utilities";

const ACIssues = ({ owner, repository }) => {
  // Query for obtaining issues
  const { loading, error, data, fetchMore } = useQuery(ISSUES, {
    variables: { repositoryName: repository, ownerName: owner, cursor: null },
    fetchPolicy: "network-only",
  });
  console.log("Received data", data);

  const handleClick = () => {
    const { hasNextPage, endCursor } = data.repository.issues.pageInfo;
    // console.log(endCursor);

    if (hasNextPage) {
      fetchMore({
        variables: { cursor: endCursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
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
      {console.log("ISSUE Data Rendered", data)}
      {data && (
        <>
          <h2>Issues Table</h2>

          <p>
            {`Showing data from ${
              data.repository.issues.edges[
                data.repository.issues.edges.length - 1
              ].node.createdAt
            } to ${data.repository.issues.edges[0].node.createdAt}.`}
          </p>

          <Link
            disabled={!data.repository.issues.pageInfo.hasNextPage}
            onClick={handleClick}
          >
            Load More
          </Link>
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
