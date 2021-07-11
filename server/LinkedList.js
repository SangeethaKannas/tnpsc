//https://github.com/SangeethaKannas/fullstack-training/blob/main/dsa/datastructures/linkedlist.js
class LinkedNode {
  constructor(element = 0, next = null) {
    this.element = element;
    this.next = next;
  }
}

class LinkedList {
  length = 0;
  head = null;

  size = function () {
    return length;
  };

  head = function () {
    return head;
  };

  from = function (inputArray) {
    this.head = inputArray.reverse().reduce((acc, curr) => {
      if (acc == null) {
        acc = new ListNode(curr);
      } else {
        acc = new ListNode(curr, acc);
      }
      return acc;
    }, null);
  };

  print = function () {
    var currentNode = head;
    if (currentNode === null) {
      console.log("List is empty");
      return false;
    }

    while (currentNode != null) {
      console.log(currentNode.element);
      currentNode = currentNode.next;
    }
  };

  add = function (element) {
    var node = new LinkedNode(element);

    if (head === null) {
      head = node;
    } else {
      var currentNode = head;

      while (currentNode.next) {
        currentNode = currentNode.next;
      }

      currentNode.next = node;
    }

    length++;
  };

  remove = function (element) {
    var currentNode = head;
    var previousNode;
    if (currentNode.element === element) {
      head = currentNode.next;
    } else {
      while (currentNode.element !== element) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }

      previousNode.next = currentNode.next;
    }

    length--;
  };

  isEmpty = function () {
    return length === 0;
  };

  indexOf = function (element) {
    var currentNode = head;
    var index = -1;

    while (currentNode) {
      index++;
      if (currentNode.element === element) {
        return index;
      }
      currentNode = currentNode.next;
    }

    return -1;
  };

  elementAt = function (index) {
    var currentNode = head;
    var count = 0;
    while (count < index) {
      count++;
      currentNode = currentNode.next;
    }
    return currentNode.element;
  };

  addAt = function (index, element) {
    var node = new LinkedNode(element);
    var currentNode = head;

    if (index > length) {
      return false;
    } else if (index === 0) {
      currentNode.next = head;
      head = currentNode;
    } else {
      var currentIndex = 0;
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      node.next = currentNode;
      previousNode.next = node;
    }
    length++;
  };

  removeAt = function (index, element) {
    var node = new LinkedNode(element);
    var currentNode = head;

    if (index < 0 || index >= length) {
      return null;
    }

    if (index === 0) {
      head = currentNode.next;
    } else {
      var currentIndex = 0;
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next;
    }
    length--;
    return currentNode.element;
  };
}

module.exports = {LinkedNode, LinkedList}