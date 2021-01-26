import { event } from "jquery";
import { useState, useEffect } from "react";

const DeveloperList = ({ developers }) => {
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const people = developers.map((developer) => developer.name);
  //   console.log(people);

  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    const results = people.filter((person) =>
      person.toLowerCase().includes(searchName.toLowerCase())
    );
    setSearchResults(results);
  }, [searchName]);

  return (
    <div className="developer-list">
      <h2>Developers:</h2>
      <input
        type="text"
        placeholder={`Search (${people.length})`}
        value={searchName}
        onChange={(e) => handleSearch(e)}
      />
      <ul>
        {searchResults.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      {/* {developers.map((developer) => (
        <p key={developer.login}>{developer.name}</p>
      ))} */}
    </div>
  );
};

export default DeveloperList;
