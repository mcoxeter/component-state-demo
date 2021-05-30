import { Machine } from 'xstate';

const noData = (_: any, event: any) => {
  return (
    event?.data?.firstName.length === 0 && event?.data?.surname.length === 0
  );
};

const completedData = (_: any, event: any) => {
  return event?.data?.firstName.length > 0 && event?.data?.surname.length > 0;
};

const changeData = [
  {
    target: 'stepInprogress_dataNone_unLocked',
    cond: noData
  },
  {
    target: 'stepInprogress_dataComplete_unLocked',
    cond: completedData
  },
  {
    target: 'stepInprogress_dataIncomplete_unLocked'
  }
];
export const nameMachine = Machine({
  id: 'nameMachine',
  type: 'parallel',
  states: {
    workflow: {
      initial: 'stepInprogress_dataNone_unLocked',
      states: {
        stepInprogress_dataNone_unLocked: {
          on: { CHANGE_DATA: changeData }
        },
        stepInprogress_dataIncomplete_unLocked: {
          on: { CHANGE_DATA: changeData }
        },
        stepInprogress_dataComplete_unLocked: {
          on: {
            CHANGE_DATA: changeData,
            LOCK: 'stepInprogress_dataComplete_locked'
          }
        },
        stepInprogress_dataComplete_locked: {
          on: {
            STEP_COMPLETE: 'stepComplete_dataComplete_locked',
            UN_LOCK: 'stepInprogress_dataComplete_unLocked'
          }
        },
        stepComplete_dataComplete_locked: {
          on: { STEP_INPROGRES: 'stepInprogress_dataComplete_unLocked' }
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
});
