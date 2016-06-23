export default function courseReducer(state = [], action) {
  switch (action.type) {
    case "CRAETE_COURSE":
debugger;
        const newState = [
          ...state,
          Object.assign({}, action.course)
        ];

    debugger;
      return newState;

    default:
      return state;
  }
}
