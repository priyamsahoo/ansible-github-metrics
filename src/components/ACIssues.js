import { useQuery } from '@apollo/client';
import { ISSUES } from '../queries/queries';
import IssueTable from './IssueTable';
import { useState } from 'react';

const ACIssues = ({ repository }) => {

  // const [repository, setRepository] = useState("cisco.nxos");

    const { loading, error, data, refetch } = useQuery(ISSUES, {
      variables: {repositoryName: repository}
    });
    // console.log(data);

    return (
        <div className="ac-issues">
{/* 
          <div>
            <label>Repositories: </label>
            <select
              value={repository}
              onChange={(e) => setRepository(e.target.value)}>
              <option value="cisco.nxos">cisco.nxos</option>
              <option value="cisco.ios">cisco.ios</option>
              <option value="cisco.iosxr">cisco.iosxr</option>
              <option value="arista.eos">arista.eos</option>
              <option value="vyos.vyos">vyos.vyos</option>
              <option value="junipernetworks.junos">junipernetworks.junos</option>
              <option value="cisco.asa">cisco.asa</option>
              <option value="ansible.netcommon">ansible.netcommon</option>
              <option value="frr.frr">frr.frr</option>
              <option value="openvswitch.openvswitch">openvswitch.openvswitch</option>
              <option value="community.yang">community.yang</option>
              <option value="ansible.utils">ansible.utils</option>
            </select>
          </div> */}

            { error && <div>{ error }</div>}
            { loading && <div>Loading...</div>}
            { data && <IssueTable name={ data.repository.name } issues={ data.repository.issues.edges } count={ data.repository.issues.edges.length }/> }
        </div>
    );

} 
export default ACIssues;