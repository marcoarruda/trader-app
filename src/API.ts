/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCompanyInput = {
  id?: string | null,
  code: string,
  name: string,
  price: number,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelCompanyConditionInput = {
  code?: ModelStringInput | null,
  name?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCompanyConditionInput | null > | null,
  or?: Array< ModelCompanyConditionInput | null > | null,
  not?: ModelCompanyConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateCompanyInput = {
  id: string,
  code?: string | null,
  name?: string | null,
  price?: number | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteCompanyInput = {
  id?: string | null,
};

export type CreatePaperInput = {
  id?: string | null,
  quantity: number,
  accountID: string,
  companyID: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelPaperConditionInput = {
  quantity?: ModelIntInput | null,
  accountID?: ModelIDInput | null,
  companyID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPaperConditionInput | null > | null,
  or?: Array< ModelPaperConditionInput | null > | null,
  not?: ModelPaperConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePaperInput = {
  id: string,
  quantity?: number | null,
  accountID?: string | null,
  companyID?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeletePaperInput = {
  id?: string | null,
};

export type CreateAccountInput = {
  id?: string | null,
  balance?: number | null,
  owner: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelAccountConditionInput = {
  balance?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAccountConditionInput | null > | null,
  or?: Array< ModelAccountConditionInput | null > | null,
  not?: ModelAccountConditionInput | null,
};

export type UpdateAccountInput = {
  id: string,
  balance?: number | null,
  owner?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteAccountInput = {
  id?: string | null,
};

export type ModelCompanyFilterInput = {
  id?: ModelIDInput | null,
  code?: ModelStringInput | null,
  name?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCompanyFilterInput | null > | null,
  or?: Array< ModelCompanyFilterInput | null > | null,
  not?: ModelCompanyFilterInput | null,
};

export type ModelPaperFilterInput = {
  id?: ModelIDInput | null,
  quantity?: ModelIntInput | null,
  accountID?: ModelIDInput | null,
  companyID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPaperFilterInput | null > | null,
  or?: Array< ModelPaperFilterInput | null > | null,
  not?: ModelPaperFilterInput | null,
};

export type ModelAccountFilterInput = {
  id?: ModelIDInput | null,
  balance?: ModelFloatInput | null,
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAccountFilterInput | null > | null,
  or?: Array< ModelAccountFilterInput | null > | null,
  not?: ModelAccountFilterInput | null,
};

export type CreateCompanyMutationVariables = {
  input: CreateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type CreateCompanyMutation = {
  createCompany:  {
    __typename: "Company",
    id: string,
    code: string,
    name: string,
    price: number,
    papers:  {
      __typename: "ModelPaperConnection",
      items:  Array< {
        __typename: "Paper",
        id: string,
        quantity: number,
        accountID: string,
        companyID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCompanyMutationVariables = {
  input: UpdateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type UpdateCompanyMutation = {
  updateCompany:  {
    __typename: "Company",
    id: string,
    code: string,
    name: string,
    price: number,
    papers:  {
      __typename: "ModelPaperConnection",
      items:  Array< {
        __typename: "Paper",
        id: string,
        quantity: number,
        accountID: string,
        companyID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCompanyMutationVariables = {
  input: DeleteCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type DeleteCompanyMutation = {
  deleteCompany:  {
    __typename: "Company",
    id: string,
    code: string,
    name: string,
    price: number,
    papers:  {
      __typename: "ModelPaperConnection",
      items:  Array< {
        __typename: "Paper",
        id: string,
        quantity: number,
        accountID: string,
        companyID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePaperMutationVariables = {
  input: CreatePaperInput,
  condition?: ModelPaperConditionInput | null,
};

export type CreatePaperMutation = {
  createPaper:  {
    __typename: "Paper",
    id: string,
    quantity: number,
    accountID: string,
    companyID: string,
    account:  {
      __typename: "Account",
      id: string,
      balance: number | null,
      owner: string,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    company:  {
      __typename: "Company",
      id: string,
      code: string,
      name: string,
      price: number,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePaperMutationVariables = {
  input: UpdatePaperInput,
  condition?: ModelPaperConditionInput | null,
};

export type UpdatePaperMutation = {
  updatePaper:  {
    __typename: "Paper",
    id: string,
    quantity: number,
    accountID: string,
    companyID: string,
    account:  {
      __typename: "Account",
      id: string,
      balance: number | null,
      owner: string,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    company:  {
      __typename: "Company",
      id: string,
      code: string,
      name: string,
      price: number,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePaperMutationVariables = {
  input: DeletePaperInput,
  condition?: ModelPaperConditionInput | null,
};

export type DeletePaperMutation = {
  deletePaper:  {
    __typename: "Paper",
    id: string,
    quantity: number,
    accountID: string,
    companyID: string,
    account:  {
      __typename: "Account",
      id: string,
      balance: number | null,
      owner: string,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    company:  {
      __typename: "Company",
      id: string,
      code: string,
      name: string,
      price: number,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAccountMutationVariables = {
  input: CreateAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type CreateAccountMutation = {
  createAccount:  {
    __typename: "Account",
    id: string,
    balance: number | null,
    owner: string,
    papers:  {
      __typename: "ModelPaperConnection",
      items:  Array< {
        __typename: "Paper",
        id: string,
        quantity: number,
        accountID: string,
        companyID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAccountMutationVariables = {
  input: UpdateAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type UpdateAccountMutation = {
  updateAccount:  {
    __typename: "Account",
    id: string,
    balance: number | null,
    owner: string,
    papers:  {
      __typename: "ModelPaperConnection",
      items:  Array< {
        __typename: "Paper",
        id: string,
        quantity: number,
        accountID: string,
        companyID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAccountMutationVariables = {
  input: DeleteAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type DeleteAccountMutation = {
  deleteAccount:  {
    __typename: "Account",
    id: string,
    balance: number | null,
    owner: string,
    papers:  {
      __typename: "ModelPaperConnection",
      items:  Array< {
        __typename: "Paper",
        id: string,
        quantity: number,
        accountID: string,
        companyID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetCompanyQueryVariables = {
  id: string,
};

export type GetCompanyQuery = {
  getCompany:  {
    __typename: "Company",
    id: string,
    code: string,
    name: string,
    price: number,
    papers:  {
      __typename: "ModelPaperConnection",
      items:  Array< {
        __typename: "Paper",
        id: string,
        quantity: number,
        accountID: string,
        companyID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCompanysQueryVariables = {
  filter?: ModelCompanyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompanysQuery = {
  listCompanys:  {
    __typename: "ModelCompanyConnection",
    items:  Array< {
      __typename: "Company",
      id: string,
      code: string,
      name: string,
      price: number,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPaperQueryVariables = {
  id: string,
};

export type GetPaperQuery = {
  getPaper:  {
    __typename: "Paper",
    id: string,
    quantity: number,
    accountID: string,
    companyID: string,
    account:  {
      __typename: "Account",
      id: string,
      balance: number | null,
      owner: string,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    company:  {
      __typename: "Company",
      id: string,
      code: string,
      name: string,
      price: number,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPapersQueryVariables = {
  filter?: ModelPaperFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPapersQuery = {
  listPapers:  {
    __typename: "ModelPaperConnection",
    items:  Array< {
      __typename: "Paper",
      id: string,
      quantity: number,
      accountID: string,
      companyID: string,
      account:  {
        __typename: "Account",
        id: string,
        balance: number | null,
        owner: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      company:  {
        __typename: "Company",
        id: string,
        code: string,
        name: string,
        price: number,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetAccountQueryVariables = {
  id: string,
};

export type GetAccountQuery = {
  getAccount:  {
    __typename: "Account",
    id: string,
    balance: number | null,
    owner: string,
    papers:  {
      __typename: "ModelPaperConnection",
      items:  Array< {
        __typename: "Paper",
        id: string,
        quantity: number,
        accountID: string,
        companyID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAccountsQueryVariables = {
  filter?: ModelAccountFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAccountsQuery = {
  listAccounts:  {
    __typename: "ModelAccountConnection",
    items:  Array< {
      __typename: "Account",
      id: string,
      balance: number | null,
      owner: string,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateCompanySubscription = {
  onCreateCompany:  {
    __typename: "Company",
    id: string,
    code: string,
    name: string,
    price: number,
    papers:  {
      __typename: "ModelPaperConnection",
      items:  Array< {
        __typename: "Paper",
        id: string,
        quantity: number,
        accountID: string,
        companyID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCompanySubscription = {
  onUpdateCompany:  {
    __typename: "Company",
    id: string,
    code: string,
    name: string,
    price: number,
    papers:  {
      __typename: "ModelPaperConnection",
      items:  Array< {
        __typename: "Paper",
        id: string,
        quantity: number,
        accountID: string,
        companyID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCompanySubscription = {
  onDeleteCompany:  {
    __typename: "Company",
    id: string,
    code: string,
    name: string,
    price: number,
    papers:  {
      __typename: "ModelPaperConnection",
      items:  Array< {
        __typename: "Paper",
        id: string,
        quantity: number,
        accountID: string,
        companyID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePaperSubscription = {
  onCreatePaper:  {
    __typename: "Paper",
    id: string,
    quantity: number,
    accountID: string,
    companyID: string,
    account:  {
      __typename: "Account",
      id: string,
      balance: number | null,
      owner: string,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    company:  {
      __typename: "Company",
      id: string,
      code: string,
      name: string,
      price: number,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePaperSubscription = {
  onUpdatePaper:  {
    __typename: "Paper",
    id: string,
    quantity: number,
    accountID: string,
    companyID: string,
    account:  {
      __typename: "Account",
      id: string,
      balance: number | null,
      owner: string,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    company:  {
      __typename: "Company",
      id: string,
      code: string,
      name: string,
      price: number,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePaperSubscription = {
  onDeletePaper:  {
    __typename: "Paper",
    id: string,
    quantity: number,
    accountID: string,
    companyID: string,
    account:  {
      __typename: "Account",
      id: string,
      balance: number | null,
      owner: string,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    company:  {
      __typename: "Company",
      id: string,
      code: string,
      name: string,
      price: number,
      papers:  {
        __typename: "ModelPaperConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAccountSubscriptionVariables = {
  owner: string,
};

export type OnCreateAccountSubscription = {
  onCreateAccount:  {
    __typename: "Account",
    id: string,
    balance: number | null,
    owner: string,
    papers:  {
      __typename: "ModelPaperConnection",
      items:  Array< {
        __typename: "Paper",
        id: string,
        quantity: number,
        accountID: string,
        companyID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAccountSubscriptionVariables = {
  owner: string,
};

export type OnUpdateAccountSubscription = {
  onUpdateAccount:  {
    __typename: "Account",
    id: string,
    balance: number | null,
    owner: string,
    papers:  {
      __typename: "ModelPaperConnection",
      items:  Array< {
        __typename: "Paper",
        id: string,
        quantity: number,
        accountID: string,
        companyID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAccountSubscriptionVariables = {
  owner: string,
};

export type OnDeleteAccountSubscription = {
  onDeleteAccount:  {
    __typename: "Account",
    id: string,
    balance: number | null,
    owner: string,
    papers:  {
      __typename: "ModelPaperConnection",
      items:  Array< {
        __typename: "Paper",
        id: string,
        quantity: number,
        accountID: string,
        companyID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
