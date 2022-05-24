///////// 基础 /////////// 
const a = {
  val: 'a'
}
const b = {
  val: 'b'
}
const c = {
  val: 'c'
}
const d = {
  val: 'd'
}
a.next = b
b.next = c
c.next = d
// 此时便形成了链表结构 这里的a\b\c\d都可以称之为链表

// 遍历链表
let p = a;
while (p) {
  console.log(p.val);
  p = p.next
}
// 插入 插入e
const e = {
  val: 'e'
}
c.next = e
e.next = d
// 删除 删除e
c.next = d