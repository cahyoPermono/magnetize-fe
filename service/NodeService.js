export default class NodeService {

    getTreeNodes() {
        return fetch('../assets/treenodes.json').then(res => res.json())
                .then(d => d.root);
    }
}