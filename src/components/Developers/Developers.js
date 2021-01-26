import { useQuery } from "@apollo/client";
import { DEVELOPER_LIST } from "../../queries/developer_queries";
import DeveloperDetails from "./DeveloperDetails";
import DeveloperList from "./DevelopersList";

const Developers = () => {
  const { loading, error, data } = useQuery(DEVELOPER_LIST);

  console.log(data);

  return (
    <div className="developers">
      <div className="developers-content">
        <div className="dev-list">
          {/* {data && <p>{data.organization.membersWithRole.nodes[0].name}</p>} */}
          {data && (
            <DeveloperList
              developers={data.organization.membersWithRole.nodes}
            />
          )}
        </div>
        <div className="dev-details">
          <DeveloperDetails />
        </div>
      </div>
    </div>
  );
};

export default Developers;
