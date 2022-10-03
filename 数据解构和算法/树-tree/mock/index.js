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
      val: "cc",
    },
    right: {
      left: {
        val: 5,
        left: null,
        right: null,
      },
      val: "dd",
    },
  },
  right: {
    left: {
      val: 3,
      left: { val: 6, left: null, right: null },
      right: { val: 7, left: null, right: null },
    },
    val: "ee",
  },
};

module.exports = {
  binaryTree,
};
