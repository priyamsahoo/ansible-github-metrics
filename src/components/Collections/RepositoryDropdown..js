import { Select } from "antd";
import { Dropdown, InputPicker, SelectPicker } from "rsuite";

const RepositoryDropdown = ({ repositoryCallback }) => {
  const repositories = [
    "cisco.nxos",
    "cisco.ios",
    "cisco.iosxr",
    "arista.eos",
    "vyos.vyos",
    "junipernetworks.junos",
    "cisco.asa",
    "ansible.netcommon",
    "frr.frr",
    "openvswitch.openvswitch",
    "community.yang",
    "ansible.utils",
  ];

  const repoItems = [
    { value: "cisco.nxos", label: "cisco.nxos" },
    { value: "cisco.ios", label: "cisco.ios" },
    { value: "cisco.iosxr", label: "cisco.iosxr" },
    { value: "arista.eos", label: "arista.eos" },
    { value: "vyos.vyos", label: "vyos.vyos" },
    { value: "junipernetworks.junos", label: "junipernetworks.junos" },
    { value: "cisco.asa", label: "cisco.asa" },
    { value: "ansible.netcommon", label: "ansible.netcommon" },
    { value: "frr.frr", label: "frr.frr" },
    { value: "openvswitch.openvswitch", label: "openvswitch.openvswitch" },
    { value: "community.yang", label: "community.yang" },
    { value: "ansible.utils", label: "ansible.utils" },
  ];

  const { Option } = Select;

  return (
    <div className="repository-dropdown">
      <label>Repositories: </label>
      <Select
        onChange={(e) => repositoryCallback(e)}
        defaultValue="cisco.nxos"
        style={{ width: 250 }}
      >
        <Option value="cisco.nxos">cisco.nxos</Option>
        <Option value="cisco.iosxr">cisco.iosxr</Option>
        <Option value="arista.eos">arista.eos</Option>
        <Option value="vyos.vyos">vyos.vyos</Option>
        <Option value="cisco.ios">cisco.ios</Option>
        <Option value="junipernetworks.junos">junipernetworks.junos</Option>
        <Option value="cisco.asa">cisco.asa</Option>
        <Option value="ansible.netcommon">ansible.netcommon</Option>
        <Option value="frr.frr">frr.frr</Option>
        <Option value="openvswitch.openvswitch">openvswitch.openvswitch</Option>
        <Option value="community.yang">community.yang</Option>
        <Option value="ansible.utils">ansible.utils</Option>
      </Select>
      {/* *********************************************************************************** */}
      {/* <Dropdown title="Repositories" onSelect={(e) => repositoryCallback(e)}>
        <Dropdown.Item eventKey="cisco.nxos">cisco.nxos</Dropdown.Item>
        <Dropdown.Item eventKey="cisco.ios">cisco.ios</Dropdown.Item>
        <Dropdown.Item eventKey="cisco.iosxr">cisco.iosxr</Dropdown.Item>
        <Dropdown.Item eventKey="arista.eos">arista.eos</Dropdown.Item>
        <Dropdown.Item eventKey="vyos.vyos">vyos.vyos</Dropdown.Item>
        <Dropdown.Item eventKey="junipernetworks.junos">
          junipernetworks.junos
        </Dropdown.Item>
        <Dropdown.Item eventKey="cisco.asa">cisco.asa</Dropdown.Item>
        <Dropdown.Item eventKey="ansible.netcommon">
          ansible.netcommon
        </Dropdown.Item>
        <Dropdown.Item eventKey="frr.frr">frr.frr</Dropdown.Item>
        <Dropdown.Item eventKey="openvswitch.openvswitch">
          openvswitch.openvswitch
        </Dropdown.Item>
        <Dropdown.Item eventKey="community.yang">community.yang</Dropdown.Item>
        <Dropdown.Item eventKey="ansible.utils">ansible.utils</Dropdown.Item>
      </Dropdown> */}
      {/* <InputPicker
        data={repoItems}
        onSelect={(value) => repositoryCallback(value)}
        style={{ width: 300 }}
        cleanable={false}
        preventOverflow={true}
        defaultValue={repoItems[0].value}
      /> */}
    </div>
  );
};

export default RepositoryDropdown;
