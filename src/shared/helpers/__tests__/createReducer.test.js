import createReducer from 'shared/helpers/createReducer';

describe('CreateReducer', () => {
  it('Creates a proper reducer given input', () => {
    const reducer = createReducer('', {
      TYPE_1: (state, action) => {
        return true;
      },
      TYPE_2: (state, action) => {
        return false;
      },
    });
    expect(typeof reducer).toEqual('function'); // maybe we can do something a little more high fidelity
  });
});
