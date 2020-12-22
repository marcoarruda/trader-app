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

    for (const company of graphqlData.data.data.listCompanys.items) {
      const randomSign = -1 + Math.round(Math.random()) * 2
      const randomValue = Math.random() * 10
      let price = company.price + randomValue * randomSign

      if (price <= 0) {
        price = -price + (Math.random() * 10 || 1)
      }

      const input = {
        id: company.id,
        code: company.code,
        name: company.name,
        price: price
      }

      await axios({
        url: process.env.API_TRADERAPP_GRAPHQLAPIENDPOINTOUTPUT,
        method: 'post',
        headers: {
          'x-api-key': process.env.API_TRADERAPP_GRAPHQLAPIKEYOUTPUT
        },
        data: {
          query: print(updateCompany),
          variables: {
            input
          }
        }
      })
    }

    const body = {
      graphqlData: graphqlData.data.data.listCompanys
    }

    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  } catch (err) {
    console.log('error posting to appsync: ', err)
  }
}
