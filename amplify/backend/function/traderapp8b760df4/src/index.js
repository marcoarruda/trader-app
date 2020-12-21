/* eslint-disable @typescript-eslint/no-var-requires */
/* Amplify Params - DO NOT EDIT
	API_TRADERAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_TRADERAPP_GRAPHQLAPIIDOUTPUT
	API_TRADERAPP_GRAPHQLAPIKEYOUTPUT
	AUTH_TRADERAPPBFD98B0A_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require('axios')
const gql = require('graphql-tag')
const graphql = require('graphql')
const { print } = graphql

const AWSAppSyncClient = require('aws-appsync').default
const { AUTH_TYPE } = require('aws-appsync/lib/link/auth-link')
const AWS = require('aws-sdk')

const appSyncClient = new AWSAppSyncClient({
  url: process.env.API_TRADERAPP_GRAPHQLAPIENDPOINTOUTPUT,
  region: process.env.REGION,
  auth: {
    type: 'AMAZON_COGNITO_USER_POOLS',
    credentials: AWS.config.credentials
  },
  disableOffline: true
})

const updateCompany = gql`
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
`
const listCompanies = gql`
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

exports.handler = async event => {
  try {
    const graphqlData = await axios({
      url: process.env.API_TRADERAPP_GRAPHQLAPIENDPOINTOUTPUT,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_TRADERAPP_GRAPHQLAPIKEYOUTPUT
      },
      data: {
        query: print(listCompanies)
      }
    })

    for (const company of graphqlData.data.data.listCompanies.items) {
      console.log(company)
      // await axios({
      //   url: process.env.API_TRADERAPP_GRAPHQLAPIENDPOINTOUTPUT,
      //   method: 'post',
      //   headers: {},
      //   data: {
      //     query: print(updateCompany),
      //     variables: {
      //       input: {
      //           id:
      //       }
      //     }
      //   }
      // })
    }

    // TODO implement
    const response = {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
      //  headers: {
      //      "Access-Control-Allow-Origin": "*",
      //      "Access-Control-Allow-Headers": "*"
      //  },
      body: JSON.stringify({
        data: graphqlData.data,
        event,
        env: process.env.ENV
      })
    }
    return response
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    }
  }
}
