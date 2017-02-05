// Student name: Nathan VelaBorja
// Student ID: 11392441

// Do not modify this constructor function. Even if you are going for that 3rd
// "challenge point", you will only need to modify "add" and "remove".
function SortedLL489(optionalCompare)
{
    this.m_root = null;
    if (optionalCompare === undefined || optionalCompare == null)
    {
        this.m_compare = function(a,b)
        {
            if (a > b) { return 1; }
            return (a == b) ? 0 : -1;
        };
    }
    else
    {
        this.m_compare = optionalCompare;
    }
    Object.seal(this);
}

SortedLL489.prototype.add = function(valueToAdd)
{
    // Create new node
    var newNode = { 
        value: valueToAdd,
        next: null,
        previous: null
    };

    // If this is our first value
    if (this.m_root === null) {
        this.m_root = newNode;
        return;
    }

    // If we already have a root
    var navNode = this.m_root;

    // Search for where node belongs in list
    while (this.m_compare(newNode.value, navNode.value) == 1) {
        // Or stop if we reach the end
        if (navNode.next === null) {
            break;
        }
        navNode = navNode.next;                            
    }

    // Check for insert before/after navNode
    var cmpVal = this.m_compare(newNode.value, navNode.value);

    if (cmpVal < 1) {        // Insert left
        // Special case: if navNode is root
        if (navNode.previous === null) {
            newNode.next = navNode;
            navNode.previous = newNode;
            this.m_root = newNode;

            return;
        }

        navNode.previous.next = newNode;
        newNode.previous = navNode.previous;
        newNode.next = navNode;
        navNode.previous = newNode;

        return;
    } 
    else {                                      // Insert right
        // Special case: if navNode.next is null
        if (navNode.next === null) {
            navNode.next = newNode;
            newNode.previous = navNode;

            return;
        }

        navNode.next = newNode;
        newNode.previous = navNode;
        newNode.next = navNode.next;
        navNode.next.previous = newNode;

        return;
    }
}

// Implement this function so that it removes the specified value from the list
// If the value is not in the list, then the list is not modified
SortedLL489.prototype.remove = function(valueToRemove)
{
    var navNode = this.m_root;
    var removeNode = { 
        value: valueToRemove,
        next: null,
        previous: null
    };

    while (navNode !== null) {

        // If we find a match, remove item and return
        var cmpVal = this.m_compare(navNode.value, removeNode.value);

        if (cmpVal == 0) {
            // Check to see if it's the root
            if (navNode == this.m_root) {
                // Special case: root node was the only node in list
                if (this.m_root.next === null) {
                    this.m_root = null;
                }
                else {
                    this.m_root = this.m_root.next; 
                    this.m_root.previous = null;        
                    // Garbage collection will now pick up the old root
                }
            }
            else {
                // Special case: removing node at the end of list
                if (navNode.next === null) {
                    var prevNode = navNode.previous;
                    prevNode.next = null;
                    // Garbage collection will now pick up navNode
                }
                else {
                    var prevNode = navNode.previous;
                    var nextNode = navNode.next;

                    prevNode.next = nextNode;
                    nextNode.previous = prevNode;
                    // Garbage collection will now pick up navNode
                }
            }
            return;
        }

        navNode = navNode.next;
    }

    // No match found, no big deal!
}

// This function is implemented for you
// You must not alter it in any way
SortedLL489.prototype.toString = function()
{
    var node = this.m_root;
    var str = "";
    while (node !== undefined && node !== null)
    {
        // Append to string
        str += node.value.toString();
        
        // Check the 'next' member
        if (node.next === undefined)
        {
            str += "(node missing 'next' member)";
            return str;
        }
        else if (node.next !== null)
        {
            str += ",";
        }
        
        // Advance to the next node
        node = node.next;
    }
    return str;
}

