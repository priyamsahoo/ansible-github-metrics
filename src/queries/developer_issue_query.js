import { gql } from '@apollo/client';
import { REPOSITORIES } from '../data/repositories';

const removeSpecialCharacters = str => str.replace(/[^a-zA-Z ]/g, '');

const queryGenerator = (name, owner, type) => {
    return `
        ${removeSpecialCharacters(name).toUpperCase()}_${type.toUpperCase()}_ISSUES: repository(
            name: "${name}"
            owner: "${owner}"
           ) {
        name
        issues(filterBy: { createdBy: $userName }, states: ${type}) {
            totalCount
        }
    }

    `;
};

const innerQuery = () => {
    let innerQuery = ``;
    for (let repository of REPOSITORIES) {
        innerQuery =
            innerQuery +
            queryGenerator(repository.repo, repository.owner, 'OPEN') +
            `  ` +
            queryGenerator(repository.repo, repository.owner, 'CLOSED');
    }
    return innerQuery;
};

const DEVELOPER_ISSUE = () => {
    let query = `
        query issues($userName: String!) {
            ${innerQuery()}
        }
    `;

    console.log(query);

    return gql`
        ${query}
    `;
};
// return gql`
//     query issues($userName: String!) {
//         CISCO_NXOS_OPEN_ISSUES: repository(name: "cisco.nxos", owner: "ansible-collections") {
//             name
//             issues(filterBy: { createdBy: $userName }, states: OPEN) {
//                 totalCount
//             }
//         }
//         CISCO_NXOS_CLOSED_ISSUES: repository(name: "cisco.nxos", owner: "ansible-collections") {
//             name
//             issues(filterBy: { createdBy: $userName }, states: CLOSED) {
//                 totalCount
//             }
//         }
//         CISCO_IOS_OPEN_ISSUES: repository(name: "cisco.ios", owner: "ansible-collections") {
//             name
//             issues(filterBy: { createdBy: $userName }, states: OPEN) {
//                 totalCount
//             }
//         }
//         CISCO_IOS_CLOSED_ISSUES: repository(name: "cisco.ios", owner: "ansible-collections") {
//             name
//             issues(filterBy: { createdBy: $userName }, states: CLOSED) {
//                 totalCount
//             }
//         }
//         CISCO_IOSXR_OPEN_ISSUES: repository(name: "cisco.iosxr", owner: "ansible-collections") {
//             name
//             issues(filterBy: { createdBy: $userName }, states: OPEN) {
//                 totalCount
//             }
//         }
//         CISCO_IOSXR_CLOSED_ISSUES: repository(
//             name: "cisco.iosxr"
//             owner: "ansible-collections"
//         ) {
//             name
//             issues(filterBy: { createdBy: $userName }, states: CLOSED) {
//                 totalCount
//             }
//         }
//         ARISTA_EOS_OPEN_ISSUES: repository(name: "arista.eos", owner: "ansible-collections") {
//             name
//             issues(filterBy: { createdBy: $userName }, states: OPEN) {
//                 totalCount
//             }
//         }
//         ARISTA_EOS_CLOSED_ISSUES: repository(name: "arista.eos", owner: "ansible-collections") {
//             name
//             issues(filterBy: { createdBy: $userName }, states: CLOSED) {
//                 totalCount
//             }
//         }
//         VYOS_OPEN_ISSUES: repository(name: "vyos.vyos", owner: "ansible-collections") {
//             name
//             issues(filterBy: { createdBy: $userName }, states: OPEN) {
//                 totalCount
//             }
//         }
//         VYOS_CLOSED_ISSUES: repository(name: "vyos.vyos", owner: "ansible-collections") {
//             name
//             issues(filterBy: { createdBy: $userName }, states: CLOSED) {
//                 totalCount
//             }
//         }
//         JUNOS_OPEN_ISSUES: repository(
//             name: "junipernetworks.junos"
//             owner: "ansible-collections"
//         ) {
//             name
//             issues(filterBy: { createdBy: $userName }, states: OPEN) {
//                 totalCount
//             }
//         }
//         JUNOS_CLOSED_ISSUES: repository(
//             name: "junipernetworks.junos"
//             owner: "ansible-collections"
//         ) {
//             name
//             issues(filterBy: { createdBy: $userName }, states: CLOSED) {
//                 totalCount
//             }
//         }
//         CISCO_ASA_OPEN_ISSUES: repository(name: "cisco.asa", owner: "ansible-collections") {
//             name
//             issues(filterBy: { createdBy: $userName }, states: OPEN) {
//                 totalCount
//             }
//         }
//         CISCO_ASA_CLOSED_ISSUES: repository(name: "cisco.asa", owner: "ansible-collections") {
//             name
//             issues(filterBy: { createdBy: $userName }, states: CLOSED) {
//                 totalCount
//             }
//         }
//         ANSIBLE_NETCOMMON_OPEN_ISSUES: repository(
//             name: "ansible.netcommon"
//             owner: "ansible-collections"
//         ) {
//             name
//             issues(filterBy: { createdBy: $userName }, states: OPEN) {
//                 totalCount
//             }
//         }
//         ANSIBLE_NETCOMMON_CLOSED_ISSUES: repository(
//             name: "ansible.netcommon"
//             owner: "ansible-collections"
//         ) {
//             name
//             issues(filterBy: { createdBy: $userName }, states: CLOSED) {
//                 totalCount
//             }
//         }
//         FRR_OPEN_ISSUES: repository(name: "frr.frr", owner: "ansible-collections") {
//             name
//             issues(filterBy: { createdBy: $userName }, states: OPEN) {
//                 totalCount
//             }
//         }
//         FRR_CLOSED_ISSUES: repository(name: "frr.frr", owner: "ansible-collections") {
//             name
//             issues(filterBy: { createdBy: $userName }, states: CLOSED) {
//                 totalCount
//             }
//         }
//         OPENVSWITCH_OPEN_ISSUES: repository(
//             name: "openvswitch.openvswitch"
//             owner: "ansible-collections"
//         ) {
//             name
//             issues(filterBy: { createdBy: $userName }, states: OPEN) {
//                 totalCount
//             }
//         }
//         OPENVSWITCH_CLOSED_ISSUES: repository(
//             name: "openvswitch.openvswitch"
//             owner: "ansible-collections"
//         ) {
//             name
//             issues(filterBy: { createdBy: $userName }, states: CLOSED) {
//                 totalCount
//             }
//         }
//         COMMUNITY_YANG_OPEN_ISSUES: repository(
//             name: "community.yang"
//             owner: "ansible-collections"
//         ) {
//             name
//             issues(filterBy: { createdBy: $userName }, states: OPEN) {
//                 totalCount
//             }
//         }
//         COMMUNITY_YANG_CLOSED_ISSUES: repository(
//             name: "community.yang"
//             owner: "ansible-collections"
//         ) {
//             name
//             issues(filterBy: { createdBy: $userName }, states: CLOSED) {
//                 totalCount
//             }
//         }
//         ANSIBLE_UTILS_OPEN_ISSUES: repository(
//             name: "ansible.utils"
//             owner: "ansible-collections"
//         ) {
//             name
//             issues(filterBy: { createdBy: $userName }, states: OPEN) {
//                 totalCount
//             }
//         }
//         ANSIBLE_UTILS_CLOSED_ISSUES: repository(
//             name: "ansible.utils"
//             owner: "ansible-collections"
//         ) {
//             name
//             issues(filterBy: { createdBy: $userName }, states: CLOSED) {
//                 totalCount
//             }
//         }
//     }
// `;

export { DEVELOPER_ISSUE };
