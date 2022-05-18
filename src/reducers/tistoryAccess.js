export const FALSE = "tistoryAccess/FALSE";
export const TRUE = "tistoryAccess/TRUE";

export const falseStatus = status => ({ type: FALSE, status });
export const trueStatus = status => ({ type: TRUE, status });

export const initalState = {
  status:false
};

const tistoryAccess = (state = initalState, action) => {
  switch (action.type) {
    case FALSE:
      return {
        ...state,
        status: action.status
      };
      case TRUE:
      return{
        ...state.status,
        status:action.status
      }
    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요
    default:
      return state;
  }
};
 

export default tistoryAccess