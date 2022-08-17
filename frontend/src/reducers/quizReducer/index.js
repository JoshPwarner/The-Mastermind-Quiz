const initState = {
  amount: 0,
  // category: "",
  // type: "",
  // difficulty: "",
  result: [
    {
      question: "",
      correct_answer: "",
      incorrect_answers: "",
    },
  ],
  loading: false,
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        amount: action.payload,
        // category: action.payload,
        // type: action.payload,
        // difficulty: action.payload,
        loading: true,
      };
    case "LOAD_RESULT":
      return {
        ...state,
        result: action.payload,
        loading: false,
        error: false,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export default Reducer;
