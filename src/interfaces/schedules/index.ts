export interface IScheduleRequest {
    userId: string
    propertyId: string
    date: string
    hour: string
}

export interface ISchedule {
    date: string
    hour: string
}