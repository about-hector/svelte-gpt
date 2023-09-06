export function reconstructTree(map, lastMessageId) {
    const treeArray = [];
    let currentId = lastMessageId;

    while (currentId) {
        const currentNode = map[currentId];
        if (currentNode) {
            treeArray.unshift(currentNode);
            currentId = currentNode.parent;
        } else {
            break;
        }
    }

    return treeArray;
}


export async function switchBranch(map, nodeId) {
    const treeArray = reconstructTree(map, nodeId);
    let nextId = map[nodeId].children[0]

    while(nextId) {
        const nextNode = map[nextId];
        if(nextNode) {
            treeArray.push(nextNode);
            nextId = nextNode.children[0];
        } else {
            break;
        }
    }

    return treeArray;
}
