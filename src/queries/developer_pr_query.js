import { gql } from '@apollo/client';
import { REPOSITORIES } from '../data/repositories';

const removeSpecialCharacters = str => str.replace(/[^a-zA-Z ]/g, '');

const open_pr_qs = (repo, owner, selectedDeveloper) =>
    `"repo:${owner}/${repo} type:pr is:open author:${selectedDeveloper}"`;

const merged_pr_qs = (repo, owner, selectedDeveloper) =>
    `"repo:${owner}/${repo} type:pr is:merged author:${selectedDeveloper}"`;

const open_issue_qs = (repo, owner, selectedDeveloper) =>
    `"repo:${owner}/${repo} type:issue is:open author:${selectedDeveloper}"`;

const closed_issue_qs = (repo, owner, selectedDeveloper) =>
    `"repo:${owner}/${repo} type:issue is:closed author:${selectedDeveloper}"`;

const queryGenerator = (name, owner, selectedDeveloper) => {
    return `
   ${removeSpecialCharacters(name).toUpperCase()}_OPEN_PR: search(query: ${open_pr_qs(
        name,
        owner,
        selectedDeveloper,
    )}, type: ISSUE, last: 100) {
                issueCount
            }

   ${removeSpecialCharacters(name).toUpperCase()}_MERGED_PR: search(query: ${merged_pr_qs(
        name,
        owner,
        selectedDeveloper,
    )}, type: ISSUE, last: 100) {
                issueCount
            }

   ${removeSpecialCharacters(name).toUpperCase()}_OPEN_ISSUE: search(query: ${open_issue_qs(
        name,
        owner,
        selectedDeveloper,
    )}, type: ISSUE, last: 100) {
                issueCount
            }

   ${removeSpecialCharacters(name).toUpperCase()}_CLOSED_ISSUE: search(query: ${closed_issue_qs(
        name,
        owner,
        selectedDeveloper,
    )}, type: ISSUE, last: 100) {
                issueCount
            }


            `;
};

const innerQuery = selectedDeveloper => {
    let innerQuery = ``;
    for (let repository of REPOSITORIES) {
        innerQuery += queryGenerator(repository.repo, repository.owner, selectedDeveloper);
    }

    return innerQuery;
};

const DEVELOPER_PR = selectedDeveloper => {
    let query = `
        query pr {
            ${innerQuery(selectedDeveloper)}
        }

    `;

    return gql`
        ${query}
    `;
};

export { DEVELOPER_PR };
