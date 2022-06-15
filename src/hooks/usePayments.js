import {useQuery, gql, useLazyQuery} from '@apollo/client';

const GET_Payments = gql`
query {
  getPayments{
    userId{
      username
      fullName
    }
    _id
    status
    amount
    description
  }
}
`;

export const useGetPayments = () => {
  const { 
    error: paymentsError, 
    data: paymentsData, 
    loading: paymentsLoading, refetch } = useQuery(GET_Payments, {
    manual: true
  });
  return {paymentsError, paymentsData, paymentsLoading, refetch};
};
