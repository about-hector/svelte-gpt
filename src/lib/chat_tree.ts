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

export function createMapping(messages) {

    let mapping = {}

    messages.forEach((message) => {
        const { id, parent, content, role, createdAt } = message;

        // Step 3: Check if the node already exists in the hashmap
        if (!mapping[id]) {
            // Step 4: If it doesn't exist, create a new entry
            mapping[id] = {
                id,
                parent: parent ? parent : null,
                children: [],
                content: content,
                role: role,
                createdAt: createdAt
            };
        } else {
            // If it does exist, update the "parent" property
            mapping[id].parent = parent ? parent : null;
            mapping[id].content = content;
            mapping[id].role = role;
            mapping[id].createdAt = createdAt;
        }

        // Update the "children" property of the parent node
        if (parent && !mapping[parent]) {
            mapping[parent] = {
                id: parent,
                parent: null,
                children: [id]
            };
        } else if (parent) {
            mapping[parent].children.push(id);
        }
    });
    
    return mapping; 
}
