import { useQuery } from "@apollo/client";
import { useState } from "react";
import { DEVELOPER_LIST } from "../../queries/developer_queries";
import DeveloperDetails from "./DeveloperDetails";
import DeveloperList from "./DevelopersList";

const Developers = () => {
  // const { loading, error, data } = useQuery(DEVELOPER_LIST);

  const [selectedDeveloper, setSeletedDeveloper] = useState(null);
  const developerCallback = (selectedDeveloper) => {
    setSeletedDeveloper(selectedDeveloper);
  };

  // console.log(selectedDeveloper);

  return (
    <div className="developers">
      <div className="developers-content">
        <div className="dev-list">
          <DeveloperList developerCallback={developerCallback} />
          {/* {data && (
            <DeveloperList
              developers={data.organization.membersWithRole.nodes}
            />
          )} */}
        </div>
        <div className="dev-details">
          {selectedDeveloper && (
            <DeveloperDetails selectedDeveloper={selectedDeveloper} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Developers;
