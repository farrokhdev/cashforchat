import { useQuery, gql } from "@apollo/client";

const GET_ListCallLogs = gql`
query{
  listCallLogs{
    user{
    username
    amountBlocked
  }
  status
  caller
  isReserved
  }
}
`
export const useListCallLogs = () => {
  const {data: callsData, error: callsError, loading: callsLoading, refetch} = useQuery(GET_ListCallLogs, {
    manual: true
  });

  return { callsData, callsError, callsLoading, refetch};
}

const GET_getCallLog = gql`
query getCallLog($id: ID!){
  getCallLog{
    user{
      username
      amountBlocked
    }
  }
}
`

export const useGetCallLog = (id) => {
  const {
    data: singleCallData, 
    error: singleCallError, 
    loading: singleCallLoading } = useQuery(GET_getCallLog, {
      variables: { id }
  })

  return { singleCallData, singleCallError, singleCallLoading }
}