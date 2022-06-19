import { useQuery, gql, useLazyQuery } from "@apollo/client";

const GET_ListCallLogs = gql`
  query {
    listCallLogs {
      user {
        username
        fullName
        amountBlocked
      }
      provider{
        fullName
      }
      status
      step
      caller
      isReserved
    }
  }
`;
export const useListCallLogs = () => {
  const {
    data: callsData,
    error: callsError,
    loading: callsLoading,
    refetch,
  } = useQuery(GET_ListCallLogs, {
    manual: true,
  });

  return { callsData, callsError, callsLoading, refetch };
};

