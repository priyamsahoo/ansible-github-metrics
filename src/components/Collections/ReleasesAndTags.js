import { useQuery } from "@apollo/client";
import { RELEASES_AND_TAGS } from "../../queries/queries";
import moment from "moment";
// import { Card } from "reactstrap";
import { Card } from "antd";

const ReleasesAndTags = ({ owner, repository }) => {
  const { loading, error, data } = useQuery(RELEASES_AND_TAGS, {
    variables: { repositoryName: repository, ownerName: owner },
  });

  console.log(data);

  return (
    <Card className="releases-and-tags">
      <h2>Releases and Tags: {repository}</h2>
      <br />
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {data && (
        <div className="information">
          <div className="release-info">
            <h4>Total Releases: {data.release.releases.totalCount}</h4>
            <h4>Latest Release Information: </h4>
            {!data.release.latestRelease && <p>-</p>}
            {data.release.latestRelease && (
              <div>
                <p>Name: {data.release.latestRelease.name}</p>
                <p>Tag name: {data.release.latestRelease.tagName}</p>
                <p>
                  Published on:{" "}
                  {moment(
                    new Date(data.release.latestRelease.publishedAt)
                  ).format("ll")}
                </p>
                <p>Author: {data.release.latestRelease.author.name}</p>
              </div>
            )}
          </div>
          <br></br>
          <div className="tags-info">
            <h4>Total Tags: {data.tags.refs.totalCount}</h4>
            <h4>Latest Tag Information: </h4>
            {!data.tags.refs.edges && <p>-</p>}
            {data.tags.refs.edges && data.tags.refs.totalCount && (
              <div>
                <p>Name: {data.tags.refs.edges[0].node.target.name}</p>
                <p>
                  Tag message: {data.tags.refs.edges[0].node.target.message}
                </p>
                <p>
                  Published on:{" "}
                  {moment(
                    new Date(data.tags.refs.edges[0].node.target.tagger.date)
                  ).format("ll")}
                </p>
                <p>Author: {data.tags.refs.edges[0].node.target.tagger.name}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ReleasesAndTags;
