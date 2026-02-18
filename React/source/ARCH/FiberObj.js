// 由 Reconciler 生成 Fiber 对象 => hook、副作用、flags 处理，diff判断

const createFiber = function (tag, pendingProps, key, mode) {
  // 创建 fiber 节点的实例对象
  return new FiberNode(tag, pendingProps, key, mode);
};

function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null; // 映射真实 DOM

  // 通过链表的形式进行关联 => time slice
  this.return = null; // 父
  this.child = null; // 子
  this.sibling = null; // 兄弟
  this.index = 0;

  this.ref = null;
  this.refCleanup = null;
  // 和 hook 相关
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects 副作用相关
  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null;

  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  this.alternate = null;
  // ...
}