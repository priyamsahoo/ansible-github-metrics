import { Select, Card } from "antd";
import { REPOSITORIES } from "../../data/repositories";

const RepositoryDropdown = ({ repositoryCallback }) => {
  const repositories = REPOSITORIES;
  // console.log(repositories);

  const { Option } = Select;

  return (
    <Card className="repository-dropdown">
      <label>Repositories: </label>
      <Select
        onChange={(e) => repositoryCallback(e[1], e[0])}
        // onSelect={(e) => console.log(e[1], e[0])}
        defaultValue={[repositories[0].repo, repositories[0].owner]}
        style={{ width: 250 }}
      >
        {repositories.map((repository) => (
          <Option value={[repository.repo, repository.owner]}>
            {repository.repo}
          </Option>
        ))}
      </Select>
      {/* *********************************************************************************** */}
    </Card>
  );
};

export default RepositoryDropdown;
