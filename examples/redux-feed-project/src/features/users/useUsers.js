import { client } from '../../middleware/client'
import getGlobalHook from '../../middleware/getGlobalHook'

const actions = {
  fetchUsers: async function (ct) {
    const response = await client.get('/fakeApi/users')
    ct.state = response.users
    ct.updateState()
  },
}

const initialState = []
const useUsers = getGlobalHook(initialState, actions)
export default useUsers
