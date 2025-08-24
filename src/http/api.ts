import type { NewUser } from '@/types'
import axios from 'axios'
import { http } from './http'

export async function getPositios() {
  const { data } = await axios.get(
    'https://frontend-test-assignment-api.abz.agency/api/v1/positions',
  )
  return data.positions
}

export async function getUsers(
  url: string = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6',
) {
  const { data } = await axios.get(url)
  return data
}

export async function postRegister(form: NewUser) {
  const formData = new FormData()
  formData.append('name', form.name)
  formData.append('email', form.email)
  formData.append('phone', form.phone.replace(/^\+/, ''))
  formData.append('position_id', form.position_id)
  formData.append('photo', form.photo!)
  console.log('success', form)
  const res = await http.post('/users', formData)
}

export async function getToken() {
  const res = await axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/token')
  localStorage.setItem('token', res.data.token)
  return res.data.token
}
