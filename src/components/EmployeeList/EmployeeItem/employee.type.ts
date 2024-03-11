export type fromToFormat = {
  from: string
  to: string
}

export type workScheduleType = {
  time: fromToFormat
  days: fromToFormat
}

export interface IEmployee {
  id: string,
  name: string,
  position: string,
  userIcon?: string,
  work_schedule: workScheduleType,
  services_provided: string[],
}
