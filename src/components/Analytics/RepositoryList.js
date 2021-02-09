import { useState, useEffect } from "react";
// import { Input } from "rsuite";
import { Input } from "antd";
import { REPOSITORIES } from "../../data/repositories";

const RepositoryList = ({ repositoryCallback }) => {
  const [searchRepository, setSearchRepository] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // const people = developers.map((developer) => developer.name);
  //   console.log(people);

  // const repositories = [
  //   "cisco.nxos",
  //   "cisco.ios",
  //   "cisco.iosxr",
  //   "arista.eos",
  //   "vyos.vyos",
  //   "junipernetworks.junos",
  //   "cisco.asa",
  //   "ansible.netcommon",
  //   "frr.frr",
  //   "openvswitch.openvswitch",
  //   "community.yang",
  //   "ansible.utils",
  // ];

  const repositories = REPOSITORIES;
  console.log(repositories);

  // const handleSearch = (e) => {
  //   // console.log(e);
  //   setSearchRepository(e);
  // };
  // console.log(searchRepository);
  // useEffect(() => {
  //   const results = repositories["repo"].filter((repo) =>
  //     repo.toLowerCase().includes(searchRepository.toLowerCase())
  //   );
  //   setSearchResults(results);
  // }, [searchRepository]);

  return (
    <div className="repository-list">
      <h2>Repositories:</h2>
      {/* <input
        type="text"
        placeholder={`Search (${repositories.length})`}
        value={searchRepository}
        onChange={(e) => handleSearch(e)}
      /> */}
      {/* <Input
        placeholder={`Search (${repositories.length})`}
        // type="text"
        value={searchRepository}
        onChange={(e) => handleSearch(e.target.value)}
      /> */}
      {repositories.map((item) => (
        <p value={item} onClick={(e) => repositoryCallback(item)}>
          {/* <p value={item.repo} onClick={(e) => console.log(item)}> */}
          {item.repo}
        </p>
      ))}
    </div>
  );
};

export default RepositoryList;
