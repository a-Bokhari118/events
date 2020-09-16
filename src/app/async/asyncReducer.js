const ASYIC_ACTION_START = 'ASYIC_ACTION_START';
const ASYIC_ACTION_FINISH = 'ASYIC_ACTION_FINISH';
const ASYIC_ACTION_ERROR = 'ASYIC_ACTION_ERROR';

export function asyncActionStart() {
  return {
    type: ASYIC_ACTION_START,
  };
}

export function asyncActionFinish() {
  return {
    type: ASYIC_ACTION_FINISH,
  };
}

export function asyncActionError(error) {
  return {
    type: ASYIC_ACTION_ERROR,
    payload: error,
  };
}

const initialState = {
  loading: false,
  error: null,
};

export default function asyncReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ASYIC_ACTION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ASYIC_ACTION_FINISH:
      return {
        ...state,
        loading: false,
      };
    case ASYIC_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
