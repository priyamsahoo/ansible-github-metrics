import { useQuery } from '@apollo/client';
import { NUMBER_OF_OPEN_ISSUES } from '../queries/queries';

const CollectionInsights = ({ repository }) => {

    const { loading, error, data } = useQuery(NUMBER_OF_OPEN_ISSUES, {
        variables: {repositoryName: repository}
    });

    console.log(data);

    // let openIssues = data.repository.issues.totalCount;

    return (
        <div className="collection-insights">
            <h1>Collection Insights of { repository }</h1>
            {/* <h3>Open Issues: { openIssues }</h3> */}

            { error && <div>{ error }</div>}
            { loading && <div>Loading...</div>}
            { data &&  <h3>Open Issues: { data.repository.issues.totalCount }</h3> } 

        </div>
    );
}
 
export default CollectionInsights;