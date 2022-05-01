const { binaryTree } = require("./mock/index");

/**
 * @param {*} treeNode
 * @returns
 * 什么是先序遍历？
 *   - 遍历的顺序是 根节点 => 左节点 => 右节点；根左右。
 */
const preorder = (treeNode) => {
  if (!treeNode) return;
  console.log("节点value：", treeNode.val); // 访问根节点
  preorder(treeNode.left); // 访问左子树
  preorder(treeNode.right); // 访问右子树
};
preorder(binaryTree);

// 输出 1 2 4 8 5 3 6 7
