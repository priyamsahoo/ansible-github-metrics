import { useQuery } from "@apollo/client";
import { RELEASES } from "../queries/queries";

const Releases = ({ repository }) => {
  const { loading, error, data } = useQuery(RELEASES, {
    variables: { repositoryName: repository },
  });

  console.log(data);

  return (
    <div className="releases">
      <h2>Releases: {repository}</h2>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {data && (
        <div className="release-info">
          <p>Total Releases: {data.repository.releases.totalCount}</p>
          <br></br>
          <h4>Latest Release Information: </h4>
          {!data.repository.latestRelease && <p>-</p>}
          {data.repository.latestRelease && (
            <div>
              <p>Name: {data.repository.latestRelease.name}</p>
              <p>Tag name: {data.repository.latestRelease.tagName}</p>
              <p>Author: {data.repository.latestRelease.author.name}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Releases;
