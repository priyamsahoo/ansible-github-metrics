import { useQuery } from "@apollo/client";
import { ISSUES } from "../../queries/collections_queries";
import DataTable from "./DataTable";
import { ISSUE_COLUMNS } from "./IssueColumns";

const ACIssues = ({ owner, repository }) => {
  // const [repository, setRepository] = useState("cisco.nxos");

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
          tableData={data.repository.issues.edges}
          tableColumns={ISSUE_COLUMNS}
        />
      )}
    </div>
  );
};
export default ACIssues;
