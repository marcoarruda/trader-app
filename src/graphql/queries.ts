/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      code
      name
      price
      papers {
        items {
          id
          quantity
          accountID
          companyID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const listCompanys = /* GraphQL */ `
  query ListCompanys(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        name
        price
        papers {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getPaper = /* GraphQL */ `
  query GetPaper($id: ID!) {
    getPaper(id: $id) {
      id
      quantity
      accountID
      companyID
      company {
        id
        code
        name
        price
        papers {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      account {
        id
        balance
        owner
        papers {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const listPapers = /* GraphQL */ `
  query ListPapers(
    $filter: ModelPaperFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPapers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        quantity
        accountID
        companyID
        company {
          id
          code
          name
          price
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        balance
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getAccount = /* GraphQL */ `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
      id
      balance
      owner
      createdAt
      updatedAt
    }
  }
`
