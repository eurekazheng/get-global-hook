import { client } from '../../middleware/client'
import getGlobalHook from '../../middleware/getGlobalHook'


const actions = {
  fetchNotifications: async function (ct) {
    const [latestNotification] = ct.state
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    ct.state.push(...response.notifications)
    ct.state.sort((a, b) => b.date.localeCompare(a.date))
    ct.state.forEach(notification => {
      notification.isNew = !notification.read
    })
    ct.updateState()
  },
  allNotificationsRead: function (ct) {
    ct.state.forEach(notification => {
      notification.read = true
    })
    ct.updateState()
  }
}

const initialState = []
const useNotifications = getGlobalHook(initialState, actions)
export default useNotifications
