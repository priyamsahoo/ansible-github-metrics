import { useQuery } from '@apollo/client';
import { DEVELOPER_PR } from '../../queries/developer_pr_query';
import RepositoryWiseDetails from './RepositoryWiseDetails';

const SpiltupInfo = ({ selectedDeveloper }) => {
    const { loading, error, data } = useQuery(DEVELOPER_PR(selectedDeveloper));

    return (
        <div className="splitup-info">
            <h2>Repository wise details of {selectedDeveloper}</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && <RepositoryWiseDetails data={data} />}
        </div>
    );
};

export default SpiltupInfo;
