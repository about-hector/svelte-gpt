export function reconstructTree(mapping, lastMessageId) {
		const treeArray = [];
		let currentId = lastMessageId;

		while (currentId) {
			const currentNode = mapping[currentId];
			if (currentNode) {
				treeArray.unshift(currentNode);
				currentId = currentNode.parent;
			} else {
				break;
			}
		}

		return treeArray;
	}
