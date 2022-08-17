const defaultState = {
  user: { username: "", type: "" },
  id: "",
  room: null,
  result: [
    {
      question: "",
      correct_answer: "",
      incorrect_answers: "",
    },
  ],
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_HOST":
      return {
        ...state,
        user: action.payload,
        room: action.room,
      };
    case "SET_PLAYER":
      return {
        ...state,
        user: action.payload,
        room: action.room,
      };
    case "SET_ID":
      return {
        ...state,
        id: action.payload.id,
      };
    case "LOAD_RESULT":
      return {
        ...state,
        result: action.payload,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
};

export default userReducer;
