# get-global-hook

A super lightweight React.js Global State Management (GSM) library using hooks.

No more tedious concepts / functional programming with Redux / Mobx.

Only one script `getGlobalHook.js`.

Check out examples like the refactored Redux social media feeds tutorial (including AJAX).

**Under development...** NPM packages will come after a stable release in the future.

Adapted from Andre Gardi's post: https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8

## Best Practices

Setup a custom hook `useXXX.js` that wraps the `getGlobalHook` and provides some reusable actions to manipulate the states:

```javascript
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
```