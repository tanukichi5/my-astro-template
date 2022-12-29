export const moveTab = (event: any, tabs: any) => {
  const pressKeys = {
    up: event.keyCode === 38,
    down: event.keyCode === 40,
    left: event.keyCode === 37,
    right: event.keyCode === 39,
    enter: event.keyCode === 13,
  }

  // 現在のindex
  const currentIndex = tabs.indexOf(event.currentTarget)

  // 次にフォーカスするindexを取得
  const getNextFocusTabIndex = (index: number) => {
    let nextFocusTabIndex = index

    if (pressKeys.left) nextFocusTabIndex -= 1
    if (pressKeys.up) nextFocusTabIndex -= 1
    if (pressKeys.right) nextFocusTabIndex += 1
    if (pressKeys.down) nextFocusTabIndex += 1

    // 最初のindexより後ろに行くと最後のindexを設定
    if (nextFocusTabIndex === -1) {
      nextFocusTabIndex = tabs.length - 1
    }

    // 最後のindexより先に行くと最初のindexを設定
    if (nextFocusTabIndex >= tabs.length) {
      nextFocusTabIndex = 0
    }
    return nextFocusTabIndex
  }

  const target = tabs[getNextFocusTabIndex(currentIndex)]

  if (pressKeys.left || pressKeys.right || pressKeys.up || pressKeys.down) {
    target.focus()
    event.preventDefault()
  }

  if (pressKeys.enter) {
    target.focus()
    target.click()
    event.preventDefault()
  }
}
