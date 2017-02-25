// Student name: Nathan VelaBorja
// Student ID: 11392441

// Don't forget to include the .js file for the base class along with
// this one when submitting to Blackboard!

function Set489(compareFunc)
{
    // Setup inheritance
    BST.call(this, compareFunc);

    // Setup node color enum
    this.nodeColor = {
    	RED 	: "RED",
    	BLACK 	: "BLACK"
    }
}

// Setup inheritance
Set489.prototype = Object.create(BST.prototype);

//************** Utility Functions ****************\\

// Returns parent of given node (if one exists)
Set489.prototype.parentOf = function(node) {
	if (node !== null)
		return node.parent;
	return null;
}

// Returns grandparent of given node (if one exists)
Set489.prototype.grandparentOf = function(node) {
	if (node !== null && this.parentOf(node) !== null)
		return this.parentOf(this.parentOf(node));
}

// Returns uncle of given node (if one exists)
Set489.prototype.uncleOf = function(node) {
	return this.siblingOf(this.parentOf(node));
}

// Returns sibling of given node (if one exists)
Set489.prototype.siblingOf = function(node) {
	if (node === null || this.parentOf(node) === null) 
		return null;

	// If parent doesn't have two children, then there is no sibling node
	if (this.parentOf(node).left === null || this.parentOf(node).right === null)
		return null;

	if (this.m_compare(this.valueOf(node), this.valueOf(node.parent.left)) == 0)
		return node.parent.right;

	return node.parent.left;
}

// Returns right child of given node (if one exists)
Set489.prototype.rightOf = function(node) {
	if (node !== null)
		return node.right;
	return null;
}

// Returns left child of given node (if one exists)
Set489.prototype.leftOf = function(node) {
	if (node !== null)
		return node.left;
	return null;
}

// Returns value of given node (if it exists)
Set489.prototype.valueOf = function(node) {
	if (node !== null)
		return node.value;
	return null;
}

// Returns color of given node (if it exists) 
Set489.prototype.colorOf = function(node) {
	if (node !== null)
		return node.color;
	return null;
}

// Sets color of given node with given color
Set489.prototype.setColor = function(node, color) {
	if (node !== null) {
		node.color = color;
		return true;
	}
	return false;
}

// Returns true if node's color is black, false otherwise
Set489.prototype.isBlack = function(node) {
	if (node !== null && node.color == this.nodeColor.BLACK) 
		return true;
	return false;
}

// Returns true if node's color is red, false otherwise
Set489.prototype.isRed = function(node) {
	if (node !== null && node.color == this.nodeColor.RED) 
		return true;
	return false;
}

// Returns true if node is the root, false otherwise
Set489.prototype.isRoot = function(node) {
	if (node !== null)
		return (node.parent === null && this.m_compare(this.valueOf(node), this.valueOf(this.m_root)) == 0);
	return false;
}

// Returns true if node has two children, false otherwise
Set489.prototype.hasTwoChildren = function(node) {
	if (node !== null)
		return (this.leftOf(node) !== null && this.rightOf(node) !== null);
	return false;
}

// Returns largest node in left sub-tree 
Set489.prototype.maxLeftOf = function(node) {
	if (node !== null && this.leftOf(node) !== null) {
		var maxLeft = node.left;

		while (maxLeft.right != null) {
			maxLeft = maxLeft.right;
		}

		return maxLeft;
	}
	return null;
}

// Performs a right rotation about the given node
Set489.prototype.rotateRight = function(node) {
	var left = node.left;

	node.left = left.right;
	if (left.right !== null) {
		left.right.parent = node;
	}

	left.parent = node.parent;
	if (node.parent === null) {
		this.m_root = left;
	}
	else {
		if (this.m_compare(this.valueOf(node), this.valueOf(node.parent.left)) == 0) {
			node.parent.left = left;
		}
		else {
			node.parent.right = left;
		}
	}

	left.right = node;
	node.parent = left;
}

// Performs a left rotation about the given node
Set489.prototype.rotateLeft = function(node) {
	var right = node.right;

	node.right = right.left;
	if (right.left !== null) {
		right.left.parent = node;
	}

	right.parent = node.parent;
	if (node.parent === null) {
		this.m_root = right;
	}
	else {
		if (this.m_compare(this.valueOf(node), this.valueOf(node.parent.left)) == 0) {
			node.parent.left = right;
		}
		else {
			node.parent.right = right;
		}
	}

	right.left = node;
	node.parent = right;
}

//***********************************************//

//***************** Insertion *******************\\

Set489.prototype.add = function(value) {
	var node = BST.prototype.addNode.call(this, value);

	if (!node)
		return false;

	this.setColor(node, this.nodeColor.RED);

	return this.addAdjust(node);
}

Set489.prototype.addAdjust = function(node) {

	// Parent red
	if (node !== null && !this.isRoot(node) && this.isRed(this.parentOf(node))) {

		// Uncle also red
		if (this.isRed(this.uncleOf(node))) {
			this.setColor(this.parentOf(node), this.nodeColor.BLACK);
			this.setColor(this.uncleOf(node), this.nodeColor.BLACK);
			this.setColor(this.grandparentOf(node), this.nodeColor.RED);
			this.addAdjust(this.grandparentOf(node));
		}

		// Need rotation - parent is left child of grandparent
		else if (this.m_compare(this.valueOf(this.parentOf(node)), this.valueOf(this.leftOf(this.grandparentOf(node)))) == 0) {
			if (this.m_compare(this.valueOf(node), this.valueOf(this.rightOf(this.parentOf(node)))) == 0) {
				this.rotateLeft(node = this.parentOf(node));
			}

			this.setColor(this.parentOf(node), this.nodeColor.BLACK);
			this.setColor(this.grandparentOf(node), this.nodeColor.RED);
			this.rotateRight(this.grandparentOf(node));
		}

		// Need rotation - parent is right child of grandparent
		else if (this.m_compare(this.valueOf(this.parentOf(node)), this.valueOf(this.rightOf(this.grandparentOf(node)))) == 0) {
			if (this.m_compare(this.valueOf(node), this.valueOf(this.leftOf(this.parentOf(node)))) == 0) {
				this.rotateRight(node = this.parentOf(node));
			}

			this.setColor(this.parentOf(node), this.nodeColor.BLACK);
			this.setColor(this.grandparentOf(node), this.nodeColor.RED);
			this.rotateLeft(this.grandparentOf(node));
		}
	}

	// Make sure root is black
	this.setColor(this.m_root, this.nodeColor.BLACK);

	return true;
}

//***********************************************//

//****************** Removal ********************\\

Set489.prototype.remove = function(value) {

	if (!this.has(value)) 
		return false;

	var node = this.getNode(value);
	this.removeLL(node);

	// If the node has two children
	if (this.hasTwoChildren(node)) {
		// Swap max from left subtree
		var maxLeft = this.maxLeftOf(node);
		node.value = maxLeft.value;
		maxLeft.value = node.value;

		this.replaceLL(maxLeft, node);

		node = maxLeft;
	}

	// Node has 0 or 1 children
	var pullUp = this.leftOf(node) === null ? this.rightOf(node) : this.leftOf(node);

	if (pullUp !== null) {
		if (node == this.m_root) {
			this.m_root = pullUp;
			this.m_root.parent = null;
		}
		else if (this.leftOf(this.parentOf(node)) == node) {
			this.parentOf(node).setLeft(pullUp);
		}
		else {
			this.parentOf(node).setRight(pullUp);
		}

		if (this.isBlack(node)) {
			this.removeAdjust(pullUp);
		}
	}
	else if (this.isRoot(node)) {
		// Tree now empty
		this.m_root = null;
	}
	else {
		if (this.isBlack(node)) {
			this.removeAdjust(node);
		}

		this.removeFromParent(node);
	}

	return true;
}

Set489.prototype.removeAdjust = function(node) {
	while (!this.isRoot(node) && this.isBlack(node)) {

		// Node is a left child
		if (node == this.leftOf(this.parentOf(node))) {
			var sibling = this.rightOf(this.parentOf(node));

			if (this.isRed(sibling)) {
				this.setColor(sibling, this.nodeColor.BLACK);
				this.setColor(this.parentOf(node), this.nodeColor.RED);
				this.rotateLeft(this.parentOf(node));
				sibling = this.rightOf(this.parentOf(node));
			}

			if (this.isBlack(this.leftOf(sibling)) && this.isBlack(this.rightOf(sibling))) {
				this.setColor(sibling, this.nodeColor.RED);
				node = this.parentOf(node);
			}
			else {
				if (this.isBlack(this.rightOf(sibling))) {
					this.setColor(this.leftOf(sibling), this.nodeColor.BLACK);
					this.setColor(sibling, this.nodeColor.RED);
					this.rotateRight(sibling);
					sibling = this.rightOf(this.parentOf(node));
				}

				this.setColor(sibling, this.colorOf(this.parentOf(node)));
				this.setColor(this.parentOf(node), this.nodeColor.BLACK);
				this.setColor(this.rightOf(sibling), this.nodeColor.BLACK);
				this.rotateLeft(this.parentOf(node));
				node = this.m_root;
			}
		} 
		// Node is a right child
		else {
			var sibling = this.leftOf(this.parentOf(node));

			if (this.isRed(sibling)) {
				this.setColor(sibling, this.nodeColor.BLACK);
				this.setColor(this.parentOf(node), this.nodeColor.RED);
				this.rotateRight(this.parentOf(node));
				sibling = this.leftOf(this.parentOf(node));
			}

			if (this.isBlack(this.leftOf(sibling)) && this.isBlack(this.rightOf(sibling))) {
				this.setColor(sibling, this.nodeColor.RED);
				node = this.parentOf(node);
			}
			else {
				if (this.isBlack(this.leftOf(sibling))) {
					this.setColor(this.rightOf(sibling), this.nodeColor.BLACK);
					this.setCOlor(sibling, this.nodeColor.RED);
					this.rotateLeft(sibling);
					sibling = this.leftOf(this.parentOf(node));
				}

				this.setColor(sibling, this.colorOf(this.parentOf(node)));
				this.setColor(this.parentOf(node), this.nodeColor.BLACK);
				this.setColor(this.leftOf(sibling), this.nodeColor.BLACK);
				this.rotateRight(this.parentOf(node));
				node = this.m_root;
			}
		}
	}

	this.setColor(node, this.nodeColor.BLACK);
}

Set489.prototype.removeFromParent = function(node) {
	if (node === null) 
		return false;

	var parent = node.parent;

	if (parent === null)
		return false;

	if (node == this.leftOf(parent))
		parent.setLeft(null);
	else parent.setRight(null);
}

//***********************************************//











