import { Charity } from "./charity"

export interface User {
    id?: number
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    confirm?: any
    isBanned?: boolean
    charity?: Charity
    // participatedEvents: ParticipatedEvent[]
    participatedEvents?: Event[]
    followedCharities?: Charity[]
}
