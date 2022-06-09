const stateHistoryEnhancer = (reducer) => {
  const initialState = {
    previousStates: [],
    currentState: reducer(undefined, {}),
  };

  return (state = initialState, action) => {
    const { previousStates, currentState } = state;

    const newCurrentState = reducer(currentState, action);
    if (currentState === newCurrentState) {
      return state;
    }
    if (currentState) {
      return {
        previousStates: [...(previousStates || []), currentState],
        currentState: newCurrentState,
      };
    }
    return {
      previousStates: [...(previousStates || [])],
      currentState: newCurrentState,
    };
  };
};

export default stateHistoryEnhancer;
