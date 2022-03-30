let isMount = true;
let workInProgressHook = null;
const fiber = {
  stateNode: App,
  memoizedState: null,
};
function useState(initialState) {
  let hook;
  //创建一条链表 让先来的hook的next指向后来的hook
  if (isMount) {
    hook = {
      memoizedState: initialState,
      next: null,
      queue: {
        pending: null,
      },
    };
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      workInProgressHook.next = hook;
    }
    workInProgressHook = hook;
  } else {
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }
  //todo
  let baseState = hook.memoizedState;
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;
    do {
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending.next);
    hook.queue.pending = null;
  }
  hook.memoizedState = baseState;
  return [baseState, dispatchAction.bind(null, hook.queue)];
}

function dispatchAction(queue, action) {
  //双向链表 实现优先级
  const update = {
    action,
    next: null,
  };
  if (queue.pending === null) {
    update.next = update;
  } else {
    // queue.pending保存最后一个update  queue.pending u1-> queue.pending.next u0->u1
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;
  schedule();
}
function schedule() {
  workInProgressHook = fiber.memoizedState;
  const app = fiber.stateNode();
  isMount = false;
  return app;
}

function App() {
  const [num, updateNum] = useState(0);
  console.log('ismount', isMount);
  console.log('num', num);
  return {
    onclick() {
      updateNum((num) => num + 1);
    },
  };
}
window.app = schedule();
