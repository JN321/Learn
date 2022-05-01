const { binaryTree } = require("./mock/index");

/**
 * @param {*} treeNode
 * @returns
 * 什么是后序遍历？
 *   - 遍历的顺序是 左节点 => 右节点 => 根节点；左右根。
 */
const postorder = (node) => {
  if (!node) return;
  postorder(node.left); // 访问左子树
  postorder(node.right); // 访问右子树
  console.log("节点value：", node.val); // 访问根节点
};
postorder(binaryTree);

// 输出 8 4 5 2 6 7 3 1
