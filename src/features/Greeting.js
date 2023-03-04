import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGreetings } from './greetingsSlice';

const Greeting = () => {
  const dispatch = useDispatch();
  const greeting = useSelector((state) => state.greetings.greeting);
  const status = useSelector((state) => state.greetings.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGreetings());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (status === 'succeeded') {
    content = <div>{greeting}</div>;
  } else if (status === 'failed') {
    content = <div>error</div>;
  }

  return (
    <section>
      <h2>Greeting</h2>
      {content}
    </section>
  );
};

export default Greeting;
