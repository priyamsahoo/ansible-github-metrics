import { useState, useEffect } from "react";
// import { Input } from "rsuite";
import { Input } from "antd";
import { REPOSITORIES } from "../../data/repositories";

const RepositoryList = ({ repositoryCallback }) => {
  const [searchRepository, setSearchRepository] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const repositories = REPOSITORIES;
  console.log(repositories);

  const handleSearch = (e) => {
    // console.log(e);
    setSearchRepository(e);
  };
  console.log(searchRepository);
  useEffect(() => {
    const results = repositories.filter((repo) =>
      repo["repo"].toLowerCase().includes(searchRepository.toLowerCase())
    );
    setSearchResults(results);
  }, [searchRepository]);

  return (
    <div className="repository-list">
      <h2>Repositories:</h2>
      {/* <input
        type="text"
        placeholder={`Search (${repositories.length})`}
        value={searchRepository}
        onChange={(e) => handleSearch(e)}
      /> */}
      <Input
        placeholder={`Search (${searchResults.length})`}
        // type="text"
        allowClear={true}
        value={searchRepository}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {searchResults.map((item) => (
        <p value={item} onClick={(e) => repositoryCallback(item)}>
          {/* <p value={item.repo} onClick={(e) => console.log(item)}> */}
          {item.repo}
        </p>
      ))}
    </div>
  );
};

export default RepositoryList;
