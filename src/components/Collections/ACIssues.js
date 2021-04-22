import { InMemoryCache, useQuery } from "@apollo/client";
import { Button, Card, Divider, Tag, Typography } from "antd";
import { useCallback } from "react";
import { ISSUES } from "../../queries/collections_queries";
import DataTable from "./DataTable";
import { ISSUE_COLUMNS } from "./IssueColumns";
import moment from "moment";
import { useEffect } from "react";
import { relayStylePagination } from "@apollo/client/utilities";
import { CalendarOutlined, SyncOutlined } from "@ant-design/icons";

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

          <div
            style={{
              display: "flex",
              direction: "row",
              justifyContent: "center",
            }}
          >
            {data.repository.issues.totalCount ===
            data.repository.issues.edges.length ? (
              <Card
                hoverable
                style={{
                  width: 200,
                  flexGrow: 4,
                  marginLeft: 5,
                  marginRight: 5,
                }}
              >
                <p>
                  <em>
                    Fetched data since beginning:{" "}
                    {data.repository.issues.totalCount} issues
                  </em>
                </p>
              </Card>
            ) : null}

            <Card
              hoverable
              style={{
                width: 200,
                flexGrow: 4,
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              <p>
                <CalendarOutlined /> data from{" "}
                <em>
                  {moment(
                    new Date(
                      data.repository.issues.edges[
                        data.repository.issues.edges.length - 1
                      ].node.createdAt
                    )
                  ).format("ll")}
                </em>{" "}
                to{" "}
                <em>
                  {moment(
                    new Date(data.repository.issues.edges[0].node.createdAt)
                  ).format("ll")}
                </em>
              </p>
            </Card>

            <Button
              style={{ width: 50, height: 50 }}
              shape="circle"
              disabled={!data.repository.issues.pageInfo.hasNextPage}
              onClick={handleClick}
            >
              <SyncOutlined size="large" />
            </Button>

            {/* <Card
              hoverable={data.repository.issues.pageInfo.hasNextPage}
              style={{
                width: 200,
                flexGrow: 1,
                marginLeft: 5,
                marginRight: 5,
                background: "yellow",
              }}
              onClick={handleClick}
            >
              Load More
            </Card> */}
          </div>

          <DataTable
            tag="Issues"
            repositoryName={data.repository.nameWithOwner}
            tableData={data.repository.issues.edges}
            totalCount={data.repository.issues.totalCount}
            tableColumns={ISSUE_COLUMNS}
          />
        </>
      )}
    </div>
  );
};
export default ACIssues;
