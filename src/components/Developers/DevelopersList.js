import { event } from "jquery";
import { useState, useEffect } from "react";
// import { Input } from "rsuite";
import { Input } from "antd";

const DeveloperList = ({ developerCallback }) => {
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // const people = developers.map((developer) => developer.name);
  //   console.log(people);

  const people = [
    "goneri",
    "Akasurde",
    "Qalthos",
    "pabelanger",
    "maxamillion",
    "ashwini-mhatre",
    "jillr",
    "ganeshrn",
    "NilashishC",
    "cidrblock",
    "justjais",
    "rohitthakur2590",
    "alinabuzachis",
    "GomathiselviS",
  ];

  const handleSearch = (e) => {
    setSearchName(e);
  };

  useEffect(() => {
    const results = people.filter((person) =>
      person.toLowerCase().includes(searchName.toLowerCase())
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
        // type="text"
        placeholder={`Search (${people.length})`}
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
