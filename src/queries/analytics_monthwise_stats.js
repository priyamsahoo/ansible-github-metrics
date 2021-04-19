import { gql } from "@apollo/client";
import moment from "moment";

/*
Query structure that is built dynamically:

query {
    MONTH_YEAR_OPEN_ISSUE: search(type: ISSUE, query: "repo:{__org__/__repo__}  type:issue is:open", last: 100) {
      issueCount
    }
    MONTH_YEAR_CLOSED_ISSUE: search(type: ISSUE, query: "repo:{__org__/__repo__}  type:issue is:closed", last: 100) {
      issueCount
    }
    MONTH_YEAR_OPEN_PR: search(type: ISSUE, query: "repo:{__org__/__repo__}  type:pr is:open", last: 100) {
      issueCount
    }
    MONTH_YEAR_CLOSED_PR: search(type: ISSUE, query: "repo:{__org__/__repo__}  type:pr is:merged", last: 100) {
      issueCount
    }
}
*/

const open_pr_qs = (selectedRepository, dateString) =>
  `"repo:${selectedRepository} type:pr is:open updated:${dateString}"`;

const merged_pr_qs = (selectedRepository, dateString) =>
  `"repo:${selectedRepository} type:pr is:merged updated:${dateString}"`;

const open_issue_qs = (selectedRepository, dateString) =>
  `"repo:${selectedRepository} type:issue is:open updated:${dateString}"`;

const closed_issue_qs = (selectedRepository, dateString) =>
  `"repo:${selectedRepository} type:issue is:closed updated:${dateString}"`;

const MONTHS = () => {
  const noOfYears = 1;
  const noOfMonths = noOfYears * 12;

  const monthRanges = [];

  for (let month = 0; month <= noOfMonths; month++) {
    let monthStart = moment()
      .subtract(month, "months")
      .startOf("month")
      .format("YYYY-MM-DD")
      .toString();

    let monthEnd = moment()
      .subtract(month, "months")
      .endOf("month")
      .format("YYYY-MM-DD")
      .toString();

    let dateString = `${monthStart}..${monthEnd}`;

    monthRanges.push(dateString);
  }

  return monthRanges;
};

const queryGenerator = (selectedRepository) => {
  let finalQuery = "";

  let months = MONTHS();

  for (let i = 0; i < months.length; i++) {
    finalQuery += `
    
    ${moment(months[i].substring(0, 10), "YYYY-MM-DD").format(
      "MMM_YYYY"
    )}_OPEN_ISSUES: search(query: ${open_issue_qs(
      selectedRepository,
      months[i]
    )}, type: ISSUE, last: 100) {
        issueCount
    }`;

    finalQuery += `
    
    ${moment(months[i], "YYYY-MM-DD").format(
      "MMM_YYYY"
    )}_CLOSED_ISSUES: search(query: ${closed_issue_qs(
      selectedRepository,
      months[i]
    )}, type: ISSUE, last: 100) {
        issueCount
    }`;

    finalQuery += `
    
    ${moment(months[i], "YYYY-MM-DD").format(
      "MMM_YYYY"
    )}_OPEN_PRS: search(query: ${open_pr_qs(
      selectedRepository,
      months[i]
    )}, type: ISSUE, last: 100) {
        issueCount
    }`;

    finalQuery += `
    
    ${moment(months[i], "YYYY-MM-DD").format(
      "MMM_YYYY"
    )}_MERGED_PRS: search(query: ${merged_pr_qs(
      selectedRepository,
      months[i]
    )}, type: ISSUE, last: 100) {
        issueCount
    }`;
  }

  return finalQuery;
};

const ISSUES_AND_PRS_MONTHLY = (selectedRepository) => {
  let query = `
          query {
              ${queryGenerator(selectedRepository)}
          }
  
      `;

  //   console.log("Query String", queryGenerator(selectedRepository));

  return gql`
    ${query}
  `;
};

export { ISSUES_AND_PRS_MONTHLY };
