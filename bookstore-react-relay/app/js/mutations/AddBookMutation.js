import Relay from "react-relay";

export default class AddBookMutation extends Relay.Mutation {

    getMutation() {
        return Relay.QL `mutation AddBookMutation{addBook}`;
    }

    getVariables() {
        return {title: this.props.title};
    }

    getFatQuery() {
        return Relay.QL `
        fragment on AddBookPayload{
            bookStore{
                books
            }
            bookEdge
        }
    `;
    }

    getConfigs() {
        return [
            {
                type: "RANGE_ADD",
                parentName: "bookStore",
                parentID: this.props.bookStore.id,
                connectionName: "books",
                edgeName: "bookEdge",
                rangeBehaviors: {
                    "": "append"
                }
            }
        ];
    }
}
