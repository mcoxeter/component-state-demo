import { AnyEventObject, State } from 'xstate';
import { IDatastate } from '../data-state';
export interface NameProps {}

export type MachineType = State<
  any,
  AnyEventObject,
  any,
  { value: any; context: any }
>;

export type MachineSend = (payload: { type: string; data?: {} }) => void;

export interface IState {
  workflow: string;
  drawer: string;
}

export function toStateString(machineValue: {}): string {
  const stateValue = machineValue as IState;
  return `${stateValue.workflow}_${stateValue.drawer}`;
}

export function toDataState(machineValue: {}): IDatastate {
  return { 'data-state': toStateString(machineValue) };
}

export function toStateArray(machineValue: {}): string[] {
  return toStateString(machineValue).split('_');
}
