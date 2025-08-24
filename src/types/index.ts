export interface User {
  id: number
  name: string
  email: string
  phone: number
  position: string
  position_id: number
  photo: string
  timestamp: number
}
export interface NewUser {
  name: string
  email: string
  phone: string
  position_id: string
  photo: File | null
}

export interface Position {
  id: number
  name: String
}
