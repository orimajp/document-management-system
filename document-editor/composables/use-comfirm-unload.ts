// https://qiita.com/Domao/items/10e04afe26c9d5638d15
// 今回はリロードはない想定なのでbeforeunloadへのイベントリスナは定義しない
import { useDirtyState } from "./use-dirty-state"

export const useConfirmUnload = () => {
  const confirmMessage = '入力内容が破棄されます。よろしいですか？'

  const { isDirty } = useDirtyState()

  onBeforeRouteLeave((_to, _from, next) => {
    console.log('onBeforeRouteLeave')
    confirmVueRouter(next)
  })

  onBeforeRouteUpdate((_to, _from, next) => {
    console.log('onBeforeRouteUpdate')
    confirmVueRouter(next)
  })

  const confirmVueRouter = (next: any) => {
    if (!isDirty.value || window.confirm(confirmMessage)) {
      next()
    }
  }
}
