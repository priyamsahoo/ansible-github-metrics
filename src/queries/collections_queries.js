import { gql } from "@apollo/client";

const ISSUES = gql`
  query($repositoryName: String!, $ownerName: String!) {
    repository(name: $repositoryName, owner: $ownerName) {
      name
      nameWithOwner
      issues(first: 100, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          node {
            author {
              login
            }
            state
            title
            number
            createdAt
            url
            updatedAt
          }
        }
        totalCount
      }
    }
  }
`;

const PR = gql`
  query($repositoryName: String!, $ownerName: String!) {
    repository(name: $repositoryName, owner: $ownerName) {
      name
      nameWithOwner
      pullRequests(
        first: 100
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        edges {
          node {
            author {
              login
            }
            createdAt
            updatedAt
            url
            state
            title
            number
          }
        }
        totalCount
      }
    }
  }
`;

const COLLECTION_INSIGHTS = gql`
  query($repositoryName: String!, $ownerName: String!) {
    repository(name: $repositoryName, owner: $ownerName) {
      openIssues: issues(filterBy: { states: [OPEN] }) {
        totalCount
      }
      closedIssues: issues(filterBy: { states: [CLOSED] }) {
        totalCount
      }
      openPRs: pullRequests(states: OPEN) {
        totalCount
      }
      closedPRs: pullRequests(states: CLOSED) {
        totalCount
      }
      mergedPRs: pullRequests(states: MERGED) {
        totalCount
      }
    }
  }
`;

const RELEASES_AND_TAGS = gql`
  query($repositoryName: String!, $ownerName: String!) {
    tags: repository(name: $repositoryName, owner: $ownerName) {
      refs(refPrefix: "refs/tags/", last: 1) {
        totalCount
        edges {
          node {
            target {
              ... on Tag {
                name
                message
                tagger {
                  name
                  date
                }
              }
            }
          }
        }
      }
    }
  }
`;

export { ISSUES, PR, COLLECTION_INSIGHTS, RELEASES_AND_TAGS };
