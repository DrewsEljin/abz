import { ref } from 'vue'
import { getUsers } from '@/http/api'
import type { User } from '@/types'
import { useLoader } from './useLoader'

const { showLoader, hideLoader } = useLoader()
const users = ref<User[]>([])
const nextUrl = ref<string | null>(null)
export function useUsers() {
  // First load or reset
  async function loadUsers() {
    showLoader()
    try {
      const { users: newUsers, links } = await getUsers()
      users.value = newUsers
      nextUrl.value = links.next_url
    } catch (e) {
      console.log(e)
    } finally {
      hideLoader()
    }
  }
  // Show more users (by pages)
  async function moreUsers() {
    if (nextUrl.value) {
      showLoader()
      try {
        const { users: newUsers, links } = await getUsers(nextUrl.value)
        users.value.push(...newUsers)
        nextUrl.value = links.next_url
      } catch (e) {
        console.log(e)
      } finally {
        hideLoader()
      }
    }
  }
  return { users, nextUrl, loadUsers, moreUsers }
}
