import client from '../config'

export const queryData = async (inputQuery, variables = {}) => {
    const data = await client.query({
        inputQuery,
        variables,
    })
    return data
  }
  
export const mutateData = async (inputQuery, variables = {}) => {
    const data = await client.mutate({
        inputQuery,
        variables
    })
    return data
}