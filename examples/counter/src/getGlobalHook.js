import { useState, useEffect } from 'react'

// A Global State Management (GSM) hook indicating that state modifications
// have finished and initiate re-render. Similar to native setState() but 
// makes it easier for state modifications.
function updateState() {
  // Notify all subscribers
  this.subscribers.forEach((subscriber) => {
    // Re-render only be triggered, via implicit states (see below),
    // only when the interested explicit state content is modified.
    subscriber(JSON.stringify(this.state))
  })
}

function useGlobal() {
  // Only for the first time will these hooks used for subscription.
  const [implicitState, setImplicitState] = useState()
  // setImplicitState serves as a subscriber because effectively updating
  // the implicitState will cause the subscribing component (the one that
  // called the useState()) to re-render.
  useEffect(() => {
    // Add the subscriber after component just mounted.
    this.subscribers.push(setImplicitState)
    // Remove the subscriber before component unmount.
    return () => {
      this.subscribers = this.subscribers.filter(
        (subscriber) => subscriber !== setImplicitState
      )
    }
  }, [])
  // Retrieve and return handles to the global state.
  return [this.state, this.actions]
}

const getGlobalHook = (initialState, actions) => {
  // Setup the context that updateState() and useGlobal() use.
  const context = { state: initialState, subscribers: [] }
  // Bind context to updateState() because we want to expose updateState()
  // for external GSM usage (outside of the context dict) in components.
  context.updateState = updateState.bind(context)
  // Contextualize actions as well for external GSM usage.
  for (let key in actions) {
    actions[key] = actions[key].bind(null, context)
  }
  context.actions = actions
  // Bind context to useGlobal() because it will be exposed for GSM in stores.
  return useGlobal.bind(context)
}

export default getGlobalHook
