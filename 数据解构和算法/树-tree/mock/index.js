// 二叉树
const binaryTree = {
  val: 1,
  left: {
    val: 2,
    left: {
      left: {
        val: 4,
        left: null,
        right: {
          val: 8,
          left: null,
          right: null,
        },
      },
    },
    right: {
      left: {
        val: 5,
        left: null,
        right: null,
      },
    },
  },
  right: {
    left: {
      val: 3,
      left: { val: 6, left: null, right: null },
      right: { val: 7, left: null, right: null },
    },
  },
};

module.exports = {
  binaryTree,
};
