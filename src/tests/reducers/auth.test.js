import authReducer from '../../reducers/auth';

test('should set uid in state when logging in', () => {
  const uid = 'testuid';
  const action = {
    type: 'LOGIN',
    uid
  };
  const state = authReducer({}, action);

  expect(state.uid).toBe(uid);
});

test('should clear uid in state when logging out', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer({ uid: 'anything' }, action);

  expect(state).toEqual({});
});