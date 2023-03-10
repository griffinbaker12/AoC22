let tree = {
    "10": {
        value: "10",
        left: "4",
        right: "17",
    },
    "4": {
        value: "4",
        left: "1",
        right: "9",
    },
    "17": {
        value: "17",
        left: "12",
        right: "18",
    },
    "1": {
        value: "1",
        left: null,
        right: null,
    },
    "9": {
        value: "9",
        left: null,
        right: null,
    },
    "12": {
        value: "12",
        left: null,
        right: null,
    },
    "18": {
        value: "18",
        left: null,
        right: null,
    },
};

function bfs(tree, rootNode) {
    const queue = [];
    queue.push(rootNode)
    while (queue.length) {
        const currNode = queue.shift();
        console.log(currNode.value);
        if (currNode.left) {
            queue.push(tree[currNode.left]);
        }
        if (currNode.right) {
            queue.push(tree[currNode.right]);
        }
    }
}

bfs(tree, tree[10])