import { AnyEventObject, State } from 'xstate';
import { IDatastate } from '../data-state';
export interface NameProps {}

export interface NameData {
  firstName: string;
  surname: string;
}

export type Machine = State<
  any,
  AnyEventObject,
  any,
  { value: any; context: any }
>;

export type Send = (type: string, data?: {}) => void;
export type MachineSend = (payload: { type: string; data?: {} }) => void;

export interface IState {
  workflow: string;
  drawer: string;
}

export function toStateString(machineValue: {}): string {
  const stateValue = machineValue as IState;
  return `${stateValue.workflow}_${stateValue.drawer}`;
}

export class NameMachine {
  constructor(
    public machine: Machine,
    public send: Send,
    public previousState: string
  ) {}

  public toDataState(): IDatastate {
    return {
      'data-state': this.toString(),
      'data-state-previous': this.previousState
    };
  }
  public toString(): string {
    return toStateString(this.machine.value);
  }

  public isLocked(): boolean {
    return toStateString(this.machine.value).match(/locked/g) ? true : false;
  }

  public isDataComplete(): boolean {
    return toStateString(this.machine.value).match(/dataComplete/g)
      ? true
      : false;
  }

  public isStepComplete(): boolean {
    return toStateString(this.machine.value).match(/stepComplete/g)
      ? true
      : false;
  }
  public isDrawClosed(): boolean {
    return toStateString(this.machine.value).match(/drawClosed/g)
      ? true
      : false;
  }

  public get nameData(): NameData {
    return this.machine.context.data;
  }
}
