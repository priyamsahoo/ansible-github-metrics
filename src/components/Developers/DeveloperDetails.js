import { Divider, PageHeader } from "antd";
import OverallInfo from "./OverallInfo";
import SpiltupInfo from "./SplitupInfo";

const DeveloperDetails = ({ selectedDeveloper }) => {
  // console.log(data);

  return (
    <div className="developer-details">
      {/* <p>{selectedDeveloper}</p> */}
      {/* {data && (
        <OverallInfo
          collectionInfo={
            data.user.ansibleCollections.contributionCalendar.totalContributions
          }
        />
      )} */}
      <PageHeader
        className="page-header"
        title="Developer"
        subTitle={selectedDeveloper}
      />

      <OverallInfo selectedDeveloper={selectedDeveloper} />
      <Divider plain style={{ backgroundColor: "#6f909d" }} />
      <SpiltupInfo selectedDeveloper={selectedDeveloper} />
    </div>
  );
};

export default DeveloperDetails;
