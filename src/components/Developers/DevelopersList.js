import { event } from "jquery";
import { useState, useEffect } from "react";
// import { Input } from "rsuite";
import { Input } from "antd";
import { USERS } from "../../data/users";

const DeveloperList = ({ developerCallback }) => {
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // const users = developers.map((developer) => developer.name);
  //   console.log(users);

  const users = USERS;

  const handleSearch = (e) => {
    setSearchName(e);
  };

  useEffect(() => {
    const results = users.filter((user) =>
      user.toLowerCase().includes(searchName.toLowerCase())
    );
    setSearchResults(results);
  }, [searchName]);

  // const handleClick = (item) => {
  //   console.log(item);
  // };

  return (
    <div className="developer-list">
      <h2>Developers:</h2>
      <Input
        allowClear={true}
        // type="text"
        placeholder={`Search (${users.length})`}
        value={searchName}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {searchResults.map((item) => (
        <p value={item} onClick={(e) => developerCallback(item)}>
          {item}
        </p>
      ))}
    </div>
  );
};

export default DeveloperList;
