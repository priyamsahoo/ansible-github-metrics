import { useState } from "react";
import ACIssues from "./ACIssues";
import ACPullRequests from "./ACPullRequests";
import CollectionInsights from "./CollectionInsights";
import ReleasesAndTags from "./ReleasesAndTags";
import RepositoryDropdown from "./RepositoryDropdown.";

const Collections = () => {
  const [repository, setRepository] = useState("cisco.nxos");

  const repositoryCallback = (repo) => {
    setRepository(repo);
  };

  return (
    <div className="collections">
      <div className="collection-contents">
        <div className="insights-and-release-info">
          <div>
            <RepositoryDropdown repositoryCallback={repositoryCallback} />
          </div>
          <div>
            <CollectionInsights repository={repository} />
          </div>
          <div>
            <ReleasesAndTags repository={repository} />
          </div>
        </div>
        <div className="tables">
          <div>
            <ACIssues repository={repository} />
          </div>
          <div>
            <ACPullRequests repository={repository} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
