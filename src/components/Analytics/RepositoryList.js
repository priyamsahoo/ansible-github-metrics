import { useState, useEffect } from "react";

const RepositoryList = ({ repositoryCallback }) => {
  const [searchRepository, setSearchRepository] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // const people = developers.map((developer) => developer.name);
  //   console.log(people);

  const repositories = [
    "cisco.nxos",
    "cisco.ios",
    "cisco.iosxr",
    "arista.eos",
    "vyos.vyos",
    "junipernetworks.junos",
    "cisco.asa",
    "ansible.netcommon",
    "frr.frr",
    "openvswitch.openvswitch",
    "community.yang",
    "ansible.utils",
  ];

  const handleSearch = (e) => {
    setSearchRepository(e.target.value);
  };
  console.log(searchRepository);
  useEffect(() => {
    const results = repositories.filter((repo) =>
      repo.toLowerCase().includes(searchRepository.toLowerCase())
    );
    setSearchResults(results);
  }, [searchRepository]);

  return (
    <div className="repository-list">
      <h2>Repositories:</h2>
      <input
        type="text"
        placeholder={`Search (${repositories.length})`}
        value={searchRepository}
        onChange={(e) => handleSearch(e)}
      />
      {searchResults.map((item) => (
        <p value={item} onClick={(e) => repositoryCallback(item)}>
          {item}
        </p>
      ))}
    </div>
  );
};

export default RepositoryList;
