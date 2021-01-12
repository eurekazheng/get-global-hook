import React from 'react';
import useGlobal from './useGlobal';

const Counter = () => {
  // Use global state hook for GSM.
  const [state, actions] = useGlobal();

  return (
    <div>
      <p>
        counter:
        {state.counter}
      </p>
      <button type="button" onClick={actions.asyncAdd1Global}>
        +1 to global
      </button>
    </div>
  );
};

export default Counter;
