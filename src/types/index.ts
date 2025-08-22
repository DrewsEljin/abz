export interface User {
  id: number
  name: string
  email: string
  phone: number
  position: string
  position_id?: number
  photo: string
  timestamp: number
}

export interface Position {
  id: number
  name: String
}
