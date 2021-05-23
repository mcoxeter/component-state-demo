import { Machine } from 'xstate';

// StepInprogress.NoData.UnLocked.DrawClosed (ENTRY)
// 	Open

// StepInprogress.ChangingData.UnLocked.DrawOpen
// 	ProcessData

// StepInprogress.NoData.UnLocked.DrawOpen
// 	Close, ChangeData

// StepInprogress.IncompleteData.UnLocked.DrawOpen
// 	Close, ChangeData

// StepInprogress.IncompleteData.UnLocked.DrawClosed
// 	Open

// StepInprogress.CompleteData.UnLocked.DrawOpen
// 	Close, Lock, ChangeData

// StepInprogress.CompleteData.Locked.DrawOpen
// 	Close, UnLock, StepComplete

// StepInprogress.CompleteData.Locked.DrawClosed
// 	Open

// StepComplete.CompleteData.Locked.DrawOpen
// 	Close, StepIncomplete

// StepComplete.CompleteData.Locked.DrawClosed
// 	Open, StepIncomplete

export interface NameData {
  firstName: string;
  surname: string;
}

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
            LOCK: 'stepInprogress_completeData_locked'
          }
        },
        stepInprogress_completeData_locked: {
          on: {
            STEP_COMPLETE: 'stepComplete_completeData_locked',
            UN_LOCK: 'stepInprogress_dataComplete_unLocked'
          }
        },
        stepComplete_completeData_locked: {
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
