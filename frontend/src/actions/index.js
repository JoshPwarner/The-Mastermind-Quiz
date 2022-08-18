import axios from "axios";

const loading = (amount) => ({ type: "LOADING", payload: amount });

const loadResult = (results) => ({
  type: "LOAD_RESULT",
  payload: results,
});

export const getResult = (numberOfQs, subject, difficulty) => {
  return async (dispatch) => {
    dispatch(loading(numberOfQs, subject, difficulty));
    try {
      const questions = await fetchQuiz(numberOfQs, subject, difficulty);
      dispatch(loadResult(questions));
    } catch (err) {
      console.warn(err.message);
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };
};

const fetchQuiz = async (numberOfQs, subject, difficulty) => {
  try {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=${numberOfQs}&category=${subject}&difficulty=${difficulty}&encode=url3986`
    );
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
