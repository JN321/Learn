const { binaryTree } = require("./mock/index");
/**
 * 什么是中序遍历？
 *   - 先访问左节点 => 根节点 => 右节点；左根右。
 */
const inorder = (root) => {
  if (!root) return;
  inorder(root.left); // 左
  console.log("val:", root.val); // 根
  inorder(root.right); // 右
};
inorder(binaryTree);

// 输出4 8 2 5 1 6 3 7
