import getGlobalHook from "./getGlobalHook";

const actions = {
  asyncAdd1Global: function (ct) {
    ct.state.counter += 1;
    ct.updateState();
  },
};

// Store: factory for each global state hook.
// The store script will only be executed once against multiple imports,
// meaning only ONE instantiation of the global state hook.
const initialState = { counter: 0 };
const useGlobal = getGlobalHook(initialState, actions);

export default useGlobal;
