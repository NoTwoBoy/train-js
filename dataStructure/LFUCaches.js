/**
 * @param {number} capacity
 */
var LFUCache = function (capacity) {
  this.minTime = 1
  this.capacity = capacity
  this.cachesMap = new Map()
  this.timesMap = new Map()
}

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
  if (this.capacity === 0) return -1
  if (this.cachesMap.has(key)) {
    const currentNode = this.cachesMap.get(key)
    const index = this.timesMap.get(currentNode.times).indexOf(currentNode)
    this.timesMap.get(currentNode.times).splice(index, 1)
    if (!this.timesMap.get(currentNode.times).length) {
      this.timesMap.delete(currentNode.times)
      if (currentNode.times === this.minTime) {
        this.minTime++
      }
    }
    currentNode.times++
    if (this.timesMap.has(currentNode.times)) {
      this.timesMap.get(currentNode.times).push(currentNode)
    } else {
      this.timesMap.set(currentNode.times, [currentNode])
    }
    return currentNode.value
  } else {
    return -1
  }
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
  if (this.capacity === 0) return
  if (this.cachesMap.has(key)) {
    const currentNode = this.cachesMap.get(key)
    const index = this.timesMap.get(currentNode.times).indexOf(currentNode)
    this.timesMap.get(currentNode.times).splice(index, 1)
    if (!this.timesMap.get(currentNode.times).length) {
      this.timesMap.delete(currentNode.times)
      if (currentNode.times === this.minTime) {
        this.minTime++
      }
    }
    currentNode.value = value
    currentNode.times++
    if (this.timesMap.has(currentNode.times)) {
      this.timesMap.get(currentNode.times).push(currentNode)
    } else {
      this.timesMap.set(currentNode.times, [currentNode])
    }
  } else {
    if (this.capacity === this.cachesMap.size) {
      const deleteNode = this.timesMap.get(this.minTime).shift()
      if (!this.timesMap.get(this.minTime).length) {
        this.timesMap.delete(this.minTime)
      }
      this.cachesMap.delete(deleteNode.key)
    }
    const newNode = new Node(key, value)
    this.cachesMap.set(key, newNode)
    if (this.timesMap.get(1)) {
      this.timesMap.get(1).push(newNode)
    } else {
      this.timesMap.set(1, [newNode])
    }
    this.minTime = 1
  }
}

var Node = function (key, value) {
  this.key = key
  this.value = value
  this.times = 1
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

// cnt(x) = ??? x ???????????????
// cache=[] ????????????????????????????????????????????????????????????????????????
const lfu = new LFUCache(2)
lfu.put(1, 1) // cache=[1,_], cnt(1)=1
lfu.put(2, 2) // cache=[2,1], cnt(2)=1, cnt(1)=1
lfu.get(1) // ?????? 1
// cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3) // ????????? 2 ????????? cnt(2)=1 ?????????????????????
// cache=[3,1], cnt(3)=1, cnt(1)=2
lfu.get(2) // ?????? -1???????????????
lfu.get(3) // ?????? 3
// cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4) // ????????? 1 ???1 ??? 3 ??? cnt ???????????? 1 ???????????????
// cache=[4,3], cnt(4)=1, cnt(3)=2
lfu.get(1) // ?????? -1???????????????
lfu.get(3) // ?????? 3
// cache=[3,4], cnt(4)=1, cnt(3)=3
lfu.get(4) // ?????? 4
// cache=[3,4], cnt(4)=2, cnt(3)=3
