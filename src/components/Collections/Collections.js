import { useState } from "react";
import ACIssues from "./ACIssues";
import ACPullRequests from "./ACPullRequests";
import CollectionInsights from "./CollectionInsights";
import ReleasesAndTags from "./ReleasesAndTags";
import RepositoryDropdown from "./RepositoryDropdown.";

const Collections = () => {
  const [repository, setRepository] = useState({
    owner: "ansible-collections",
    repo: "cisco.nxos",
  });

  const repositoryCallback = (owner, repo) => {
    setRepository({ owner: owner, repo: repo });
    console.log(repository);
  };

  return (
    <div className="collections">
      <div className="collection-contents">
        <div className="insights-and-release-info">
          <div>
            <RepositoryDropdown repositoryCallback={repositoryCallback} />
          </div>
          <div>
            <CollectionInsights
              owner={repository.owner}
              repository={repository.repo}
            />
          </div>
          <div>
            <ReleasesAndTags
              owner={repository.owner}
              repository={repository.repo}
            />
          </div>
        </div>
        <div className="tables">
          <div>
            <ACIssues owner={repository.owner} repository={repository.repo} />
          </div>
          <div>
            <ACPullRequests
              owner={repository.owner}
              repository={repository.repo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
