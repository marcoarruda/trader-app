/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
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
`;
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
`;
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
`;
export const createPaper = /* GraphQL */ `
  mutation CreatePaper(
    $input: CreatePaperInput!
    $condition: ModelPaperConditionInput
  ) {
    createPaper(input: $input, condition: $condition) {
      id
      quantity
      accountID
      companyID
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
    }
  }
`;
export const updatePaper = /* GraphQL */ `
  mutation UpdatePaper(
    $input: UpdatePaperInput!
    $condition: ModelPaperConditionInput
  ) {
    updatePaper(input: $input, condition: $condition) {
      id
      quantity
      accountID
      companyID
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
    }
  }
`;
export const deletePaper = /* GraphQL */ `
  mutation DeletePaper(
    $input: DeletePaperInput!
    $condition: ModelPaperConditionInput
  ) {
    deletePaper(input: $input, condition: $condition) {
      id
      quantity
      accountID
      companyID
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
    }
  }
`;
export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
      id
      balance
      owner
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
`;
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
      id
      balance
      owner
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
`;
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
      id
      balance
      owner
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
`;
