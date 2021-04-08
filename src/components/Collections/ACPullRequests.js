import { useQuery } from "@apollo/client";
import moment from "moment";
import { Button, Typography } from "antd";
import { useCallback } from "react";
import { PR } from "../../queries/collections_queries";
import DataTable from "./DataTable";
import { PR_COLUMNS } from "./PRColumns";

const ACPullRequests = ({ owner, repository }) => {
  // Query for obtaining pull requests
  const { loading, error, data, fetchMore } = useQuery(PR, {
    variables: { repositoryName: repository, ownerName: owner, cursor: null },
    fetchPolicy: "network-only",
  });
  // console.log(data);

  const handleClick = () => {
    const { hasNextPage, endCursor } = data.repository.pullRequests.pageInfo;
    // console.log(endCursor);

    if (hasNextPage) {
      fetchMore({
        variables: { cursor: endCursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          fetchMoreResult.repository.pullRequests.edges = [
            ...data.repository.pullRequests.edges,
            ...fetchMoreResult.repository.pullRequests.edges,
          ];

          return fetchMoreResult;
        },
      });
    }
  };

  const { Link } = Typography;

  return (
    <div className="ac-pull-requests">
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {console.log("PR Data Rendered", data)}
      {data && (
        <>
          <h2>Pull Requests Table</h2>

          <p>
            Showing data from{" "}
            <em>
              {moment(
                new Date(
                  data.repository.pullRequests.edges[
                    data.repository.pullRequests.edges.length - 1
                  ].node.createdAt
                )
              ).format("ll")}
            </em>{" "}
            to{" "}
            <em>
              {moment(
                new Date(data.repository.pullRequests.edges[0].node.createdAt)
              ).format("ll")}
            </em>
            .{" "}
            <b>
              <Link
                disabled={!data.repository.pullRequests.pageInfo.hasNextPage}
                onClick={handleClick}
              >
                Load More
              </Link>
            </b>
          </p>

          {data.repository.pullRequests.totalCount ===
          data.repository.pullRequests.edges.length ? (
            <p>
              <em>
                ( Fetched data since beginning:{" "}
                {data.repository.pullRequests.totalCount} pullRequests )
              </em>
            </p>
          ) : null}

          <DataTable
            title="Pull Requests Table"
            tag="Pull requests"
            repositoryName={data.repository.nameWithOwner}
            tableData={data.repository.pullRequests.edges}
            totalCount={data.repository.pullRequests.totalCount}
            tableColumns={PR_COLUMNS}
          />
        </>
      )}
    </div>
  );
};
export default ACPullRequests;
