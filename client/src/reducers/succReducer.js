import {RETURN_SUCCESS} from "../actions/types";
  const initialState = {};
  export default function(state = initialState, action) {
        switch (action.type) {
            case RETURN_SUCCESS:
                return action.payload;
            default:
                return state;
        }
    }