import getGlobalHook from "./getGlobalHook";

// The script will only be executed once against multiple imports,
// meaning only ONE instantiation of the global state hook.

// Actions manipulating the states.
const actions = {
  asyncAdd1Global: function (ct) {
    ct.state.counter += 1;
    ct.updateState();
  },
};

// Get global hook (state and actions).
// Unlike Redux, components have both accesses to states and actions.
const initialState = { counter: 0 };
const useGlobal = getGlobalHook(initialState, actions);

export default useGlobal;