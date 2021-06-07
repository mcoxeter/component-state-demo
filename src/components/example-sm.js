/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars

const machine = Machine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        SEARCH: 'searching'
      }
    },
    searching: {
      on: {
        RESOLVE: 'success',
        REJECT: 'failure',
        SEARCH: 'searching'
      }
    },
    success: {
      on: { SEARCH: 'searching' }
    },
    failure: {
      on: { SEARCH: 'searching' }
    }
  }
});
