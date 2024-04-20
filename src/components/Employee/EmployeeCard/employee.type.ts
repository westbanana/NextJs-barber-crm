export type fromToFormat = {
  from: string
  to: string
}

export type workScheduleType = {
  time: fromToFormat
  days: fromToFormat
}

export interface IEmployee {
  id: string | undefined,
  name: string | undefined,
  position: string | undefined,
  userIcon?: string,
  work_schedule: workScheduleType,
  services_provided: string[],
}
