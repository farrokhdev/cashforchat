import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

//GET_Settlement_Request
const GET_SettlementRequests = gql`
  query {
    getSettlementRequests {
      userId {
        _id
        username
        phoneNumber
        fullName
        enable
      }
      _id
      amount
      shebaNo
      creditCardNo
      bankName
      status
      description
    }
  }
`;
export const useSettlementRequests = () => {
  const {
    error: settError,
    data: settData,
    loading: settLoading,
    refetch: settRefetch,
  } = useQuery(GET_SettlementRequests, {
    manual: true,
  });
  return { settError, settData, settLoading, settRefetch };
};

//GET_SINGLE_REQUEST
const GET_SINGLE_REQUEST = gql`
  query singleRequest($id: ID!) {
    getSettlementRequest(id: $id) {
      userId {
        _id
        username
        phoneNumber
        fullName
        enable
      }
      _id
      amount
      shebaNo
      creditCardNo
      bankName
      status
      description
    }
  }
`;
export const useSingleRequest = (id) => {
  const [
    singleRequest,
    {
      data: singleRequestData,
      error: singleRequestError,
      loading: singleRequestLoading,
    },
  ] = useLazyQuery(GET_SINGLE_REQUEST, {
    variables: { id: id },
    fetchPolicy: "no-cache",
  });

  return {
    singleRequest,
    singleRequestError,
    singleRequestLoading,
    singleRequestData,
  };
};

//Delete_Settlement_Request
const DELETE_SETTLEMENT = gql`
  mutation deleteSettlement($id: ID!) {
    deleteSettlementRequestByAdmin(id: $id)
  }
`;
export const useDeleteSett = (id) => {
  const [
    deleteSettlement,
    {
      data: deleteSettData,
      error: deleteSettError,
      loading: deleteSettLoading,
    },
  ] = useMutation(DELETE_SETTLEMENT, {
    variables: { id: id },
  });

  return {
    deleteSettlement,
    deleteSettData,
    deleteSettError,
    deleteSettLoading,
  };
};

//Finish_Settlement_Request
const FINISH_SETTLEMENT = gql`
  mutation finish($input: FinishSettlementRequestInput!, $id: ID!) {
    finishSettlementRequest(input: $input, id: $id)
  }
`;
export const useFinish = (id, input) => {
  const [
    settFinish,
    { data: finishData, error: finishError, loading: finishLoading },
  ] = useMutation(FINISH_SETTLEMENT, {
    variables: { input: input, id: id },
  });

  return { settFinish, finishLoading, finishData, finishError };
};

//َAdd_Settlement_Request
const ADD_SETTLEMENT = gql`
  mutation addSettlement($input: SettlementRequestByAdminInput) {
    createSettlementRequestByAdmin(input: $input) {
      userId {
        _id
        username
        phoneNumber
        fullName
        enable
      }
      amount
      shebaNo
      creditCardNo
      bankName
      status
      description
    }
  }
`;
export const useAddSettlement = (input) => {
  const [
    addSettlement,
    {
      data: addSettlementData,
      error: addSettlementError,
      loading: addSettlementLoading,
    },
  ] = useMutation(ADD_SETTLEMENT, {
    variables: { input: input },
  });

  return {
    addSettlement,
    addSettlementError,
    addSettlementData,
    addSettlementLoading,
  };
};

//Edit_Settlement_Request
const Edit_Settlement_Request = gql`
  mutation editRequest($input: SettlementRequestByAdminInput, $id: ID!) {
    updateSettlementRequestByAdmin(input: $input, id: $id) {
      userId {
        _id
        username
        phoneNumber
        fullName
        enable
      }
      amount
      shebaNo
      creditCardNo
      bankName
      status
      description
    }
  }
`;
export const useEditRequest = (input, id) => {
  const [
    editRequest,
    {
      data: editRequestData,
      error: editRequestError,
      loading: editRequestLoading,
    },
  ] = useMutation(Edit_Settlement_Request, {
    variables: { input: input, id: id },
  });

  return { editRequest, editRequestData, editRequestError, editRequestLoading };
};
