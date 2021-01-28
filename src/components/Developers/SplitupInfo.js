import RepositoryWiseDetails from "./RepositoryWiseDetails";

const SpiltupInfo = ({ selectedDeveloper }) => {
  return (
    <div className="splitup-info">
      <h2>Repository wise details of {selectedDeveloper}</h2>
      <RepositoryWiseDetails />
    </div>
  );
};

export default SpiltupInfo;
