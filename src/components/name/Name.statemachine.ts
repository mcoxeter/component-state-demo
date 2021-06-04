import { assign, Machine } from 'xstate';

const isEmpty = (_: any, event: any) => {
  return (
    event?.data?.firstName.length === 0 && event?.data?.surname.length === 0
  );
};

const isFilled = (_: any, event: any) => {
  return event?.data?.firstName.length > 0 && event?.data?.surname.length > 0;
};
const addData = assign<{}, any>({
  data: (context: any, event: any) => event.data
});

const changeData = [
  {
    target: 'empty',
    actions: 'addData',
    cond: isEmpty
  },
  {
    target: 'filled',
    actions: 'addData',
    cond: isFilled
  },
  {
    target: 'semi_filled',
    actions: 'addData'
  }
];

export const nameMachine = Machine(
  {
    id: 'nameMachine',
    type: 'parallel',
    context: {
      data: {
        firstName: '',
        surname: ''
      }
    },
    states: {
      workflow: {
        initial: 'empty',
        states: {
          empty: {
            on: {
              CHANGE_DATA: changeData
            }
          },
          semi_filled: {
            on: {
              CHANGE_DATA: changeData
            }
          },
          filled: {
            on: {
              CHANGE_DATA: changeData,
              LOCK: 'locked'
            }
          },
          locked: {
            on: {
              STEP_COMPLETE: 'complete',
              UN_LOCK: 'filled'
            }
          },
          complete: {
            on: { STEP_INPROGRES: 'filled' }
          }
        }
      },
      drawer: {
        initial: 'drawClosed',
        states: {
          drawClosed: { on: { OPEN_DRAW: 'drawOpen' } },
          drawOpen: { on: { CLOSE_DRAW: 'drawClosed' } }
        }
      }
    }
  },
  {
    actions: { addData }
  }
);
