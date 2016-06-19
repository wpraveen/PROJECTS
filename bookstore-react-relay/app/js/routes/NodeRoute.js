import Relay from "react-relay";

export default class NodeRoute extends Relay.Route {
    static routeName = "nodeRoute";
    static queries = {
        node: () => Relay.QL `
            query{
                node(id:$id)
            }
        `
    };
}
