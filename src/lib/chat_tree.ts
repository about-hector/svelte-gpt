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
    // given a nodeId, reconstructs all the messages above it in the correct order
    const treeArray = reconstructTree(map, nodeId);
    if (map[nodeId] && map[nodeId].children) {
        let nextId = map[nodeId].children[0];

        while (nextId) {
            const nextNode = map[nextId];
            if (nextNode) {
                treeArray.push(nextNode);
                nextId = nextNode.children[0];
            } else {
                break;
            }
        }

        return treeArray;
    }
}

export function createMapping(messages) {
    const hashTable = {}
    messages.forEach((message) => {
        const { id, parent, content, role, createdAt } = message;
        const createdAtDate = new Date(createdAt);
        // Step 3: Check if the node already exists in the hashmap
        if (!hashTable[id]) {
            // Step 4: If it doesn't exist, create a new entry
            hashTable[id] = {
                id,
                parent: parent ? parent : null,
                children: [],
                content: content,
                role: role,
                createdAt: createdAtDate
            };
        } else {
            // If it does exist, update the "parent" property
            hashTable[id].parent = parent ? parent : null;
            hashTable[id].content = content;
            hashTable[id].role = role;
            hashTable[id].createdAt = createdAt;
        }
        // Update the "children" property of the parent node
        if (parent && !hashTable[parent]) {
            hashTable[parent] = {
                id: parent,
                parent: null,
                children: [id]
            };
        } else if (parent) {
            hashTable[parent].children.push(id);
            hashTable[parent].children.sort((a, b) => hashTable[a].createdAt - hashTable[b].createdAt);
        }
    });
    return hashTable;
}
