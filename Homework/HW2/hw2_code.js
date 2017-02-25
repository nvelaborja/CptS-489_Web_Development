// Student name: Nathan VelaBorja
// Student ID: 11392441

function BST(compareFunction) {
	this.m_root = null;
	this.m_first = null;
	this.m_last = null;

	this.m_compare = function(a, b) {
		if (a < b) { return -1; } 
		else if (a > b) { return 1; } 
		return 0;
	};
	if (compareFunction) this.m_compare = compareFunction;

	this.add = function(value) {

		// First make sure value is legit
		if (value == null || value === undefined) {
			return false;
		}

		var newNode = new BSTNode(value);

		// Special Case: root is null
		if (this.m_root == null) {
			this.m_root = newNode;
			this.m_first = newNode;
			this.m_last = newNode;
			return true;
		}

		var navNode = this.m_root;

		// Value is good, let's find where it belongs
		while (true) {
			// Duplicate
			if (this.m_compare(newNode.value, navNode.value) == 0) {
				// Currently not allowing duplicates
				return false;
			}

			// Belongs left of navNode
			if (this.m_compare(newNode.value, navNode.value) == -1) {
				// Insert and return if null, otherwise move left and continue
				if (navNode.left == null) {
					navNode.left = newNode;
					newNode.parent = navNode;

					// Insert into linked list
					this.addLL(newNode);

					return true;
				}

				navNode = navNode.left;
				continue;
			}

			// Belongs right of navNode
			if (this.m_compare(newNode.value, navNode.value) == 1) {
				// Insert and return if null, otherwise move right and continue
				if (navNode.right == null) {
					navNode.right = newNode;
					newNode.parent = navNode;

					// Insert into linked list
					this.addLL(newNode);

					return true;
				}

				navNode = navNode.right;
				continue;
			}
		}
	};

	this.addLL = function (node) {

		var lastNode = this.m_last;

		lastNode.next = node;
		node.previous = lastNode;
		this.m_last = node;
	}

	this.removeLL = function (node) {

		var left = node.previous;
		var right = node.next;

		if (left != null)
			left.next = right;
		else this.m_first = right;

		if (right != null)
			right.previous = left;
		else this.m_last = left;
	}

	// Replaces node1 with node2 in LL
	this.replaceLL = function(node1, node2) {

		node2.previous = node1.previous;
		node2.next = node1.next;

		if (node1.previous != null) {
			node1.previous.next = node2;
		}
		else {
			this.m_first = node2;
		}

		if (node1.next != null) {
			node1.next.previous = node2;
		}
		else {
			this.m_last = node2;
		}
	}

	// Return a node count. This implementation will use the linked list
	this.count = function() {

		if (this.m_root == null)
			return 0;

		var navNode = this.m_first;
		var count = 1;

		while (navNode.next != null) {
			count++;
			navNode = navNode.next;
		}

		return count;
	}

	this.getLevel = function(value) {

		var level = 0;
		var navNode = this.m_root;

		while (navNode) {
			// If we find a match, return level
			if (this.m_compare(value, navNode.value) == 0) {
				return level;
			}

			// If value would be left of navNode, increment level and move left
			if (this.m_compare(value, navNode.value) < 0) {
				level++;
				navNode = navNode.left;
				continue;
			}

			// If value would be right of navNnode, increment level and move right
			if (this.m_compare(value, navNode.value) > 0) {
				level++;
				navNode = navNode.right;
				continue;
			}
		}

		return -1;
	}

	// Traverse down the right side of the tree to find max value
	this.getMax = function() {

		var navNode = this.m_root;

		if (navNode == null) 
			return undefined;

		while (navNode.right != null) {
			navNode = navNode.right;
		}

		return navNode.value;
	}

	// Traverse down the left side of the tree to find min value
	this.getMin = function() {

		var navNode = this.m_root;

		if (navNode == null) 
			return undefined;

		while (navNode.left != null) {
			navNode = navNode.left;
		}

		return navNode.value;
	}

	// Searches tree for given value
	this.has = function(value) {

		// Lazy implementation, if we can get the level it must exist
		var level = this.getLevel(value);

		if (level != -1) 
			return true;

		return false;
	}

	this.remove = function(value) {

		// Check to see if value exists
		if (!this.has(value)) 
			return false;

		// Move to node
		var navNode = this.m_root;

		while (this.m_compare(value, navNode.value) != 0) {
			if (this.m_compare(value, navNode.value) < 0) {
				navNode = navNode.left;
				continue;
			}

			if (this.m_compare(value, navNode.value) > 0) {
				navNode = navNode.right;
				continue;
			}
		}

		// navNode is now at node we want to remove
		var parentNode = navNode.parent;

		// Find out if node is left or right child of parent
		var parentSide = "noParent";
		if (parentNode != null)
			parentSide = (this.m_compare(navNode.value, parentNode.value) > 0) ? "right" : "left";
		
		// Get child state
		var childState = this.getChildState(navNode);

		if (childState == -1) {		// Node failure
			return false;
		}
		else if (childState == 0) {		// No children

			// Simply remove reference to node from parent
			switch (parentSide) {
				case "left":
					parentNode.left = null;
					break;
				case "right":
					parentNode.right = null;
					break;
				case "noParent": 			// No child and no parent means this is lone root
					this.m_root = null;

			}

			// Remove node from linked list
			this.removeLL(navNode);

			// Garbage collection will now pick up navNode
			return true;
		}
		else if (childState == 1) {		// Left child only

			// Simply have left child replace navNode
			switch (parentSide) {
				case "left":
					parentNode.left = navNode.left;
					navNode.left.parent = parentNode;
					break;
				case "right":
					parentNode.right = navNode.left;
					navNode.left.parent = parentNode;
					break;
				case "noParent": 			// Indicates removing root node
					this.m_root = navNode.left;
					this.m_root.parent = null;

			}

			// Remove node form linked list
			this.removeLL(navNode);

			// Garbage collection will now pick up navNode
			return true;
		}
		else if (childState == 2) {		// Right child only

			// Simply have left child replace navNode
			switch (parentSide) {
				case "left":
					parentNode.left = navNode.right;
					navNode.right.parent = parentNode;
					break;
				case "right":
					parentNode.right = navNode.right;
					navNode.right.parent = parentNode;
					break;
				case "noParent": 			// Indicates removing root node
					this.m_root = navNode.right;
					this.m_root.parent = null;
			}

			// Remove node form linked list
			this.removeLL(navNode);

			// Garbage collection will now pick up navNode
			return true;
		}
		else if (childState == 3) {		// Both children

			// Need to replace navNode with right-most child

			var largestLeftChild = navNode.left;

			while (largestLeftChild.right != null) {
				largestLeftChild = largestLeftChild.right;
			}

			// Replace removing nodes value with rightmostLeftChild
			navNode.value = largestLeftChild.value;

			// Remove node form linked list
			this.removeLL(navNode);

			// Replace next/previous with largestLeft's next/previous
			this.replaceLL(largestLeftChild, navNode);

			// largestLeftChild might have had a left sub-tree, give it to it's parent
			if (largestLeftChild.left != null) {
				if (this.m_compare(largestLeftChild.left.value, largestLeftChild.parent.value) > 0) {
					largestLeftChild.parent.right = largestLeftChild.left;
					largestLeftChild.left.parent = largestLeftChild.parent;
				}
				else {
					largestLeftChild.parent.left = largestLeftChild.left;
					largestLeftChild.left.parent = largestLeftChild.parent;
				}
			}
			else {
				this.removeFromParent(largestLeftChild);
			}

			return true;
		}

		return false;
	}

	this.removeFromParent = function(node) {
		var parent = node.parent;

		if (parent == null || parent === undefined)
			return false;

		if (parent.right != null && this.m_compare(node.value, parent.right.value) == 0)
			parent.right = null;
		else if (parent.left != null && this.m_compare(node.value, parent.left.value) == 0)
			parent.left = null;

		return true;
	}

	this.toString = function(delimiter) {

		var dl = delimiter;
		if (dl == null || dc === undefined)
			dl = " ";

		// Run in-order traversal 
		var stack = [];
		var string = "";

		var navNode = this.m_root;

		while (navNode != null) {

			stack.push(navNode);
			navNode = navNode.left;
		}

		while (stack.length > 0) {

			navNode = stack.pop();

			string += navNode.value.toString() + dl.toString();

			if (navNode.right != null) {
				navNode = navNode.right;

				while (navNode != null) {

					stack.push(navNode);
					navNode = navNode.left;
				}
			}
		}

		if (string.endsWith(" "))
			string = string.substr(0, string.length - 1);

		return string;
	}

	this.forEach = function(callback, useInsertionOrder) {

		if (callback == null || callback === undefined)
			return false;

		var inorder = (useInsertionOrder) ? false : true;

		if (inorder) {
			// Run in-order traversal 
			var stack = [];
			var navNode = this.m_root;

			while (navNode != null) {
				stack.push(navNode);
				navNode = navNode.left;
			}

			while (stack.length > 0) {
				navNode = stack.pop();

				callback(navNode.value, this.m_root);

				if (navNode.right != null) {
					navNode = navNode.right;

					while (navNode != null) {
						stack.push(navNode);
						navNode = navNode.left;
					}
				}
			}

			return true;
		}

		// Use linked list
		var navNode = this.m_first;

		while (navNode != null) {
			callback(navNode.value, this.m_root);
			navNode = navNode.next;
		}

		return true;
	}

	// Returns a int value indicating the state of the node's children
	this.getChildState = function(node) {
		// Return -1 for node failure
		if (node == null || node === undefined)
			return -1;

		// Return 0 for no children
		if (node.left == null && node.right == null)
			return 0;

		// Return 1 for left child only
		if (node.left != null && node.right == null)
			return 1;

		// Return 2 for right child only
		if (node.left == null && node.right != null)
			return 2;

		// Return 2 for both children
		if (node.left != null && node.right != null)
			return 3;
	}

}

// Creates an instance of a BST Node
function BSTNode(value) {
	this.value 		= value;
	this.left 		= null;
	this.right 		= null;
	this.next 		= null;
	this.previous 	= null;
	this.parent 	= null;
}
