/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany {
    onCreateCompany {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany {
    onUpdateCompany {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany {
    onDeleteCompany {
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
export const onCreatePaper = /* GraphQL */ `
  subscription OnCreatePaper {
    onCreatePaper {
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
export const onUpdatePaper = /* GraphQL */ `
  subscription OnUpdatePaper {
    onUpdatePaper {
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
export const onDeletePaper = /* GraphQL */ `
  subscription OnDeletePaper {
    onDeletePaper {
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
export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount($owner: String!) {
    onCreateAccount(owner: $owner) {
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
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount($owner: String!) {
    onUpdateAccount(owner: $owner) {
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
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount($owner: String!) {
    onDeleteAccount(owner: $owner) {
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
