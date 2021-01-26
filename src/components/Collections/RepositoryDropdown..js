const RepositoryDropdown = ({ repositoryCallback }) => {
  return (
    <div className="repository-dropdown">
      <label>Repositories: </label>
      <select onChange={(e) => repositoryCallback(e.target.value)}>
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
    </div>
  );
};

export default RepositoryDropdown;
