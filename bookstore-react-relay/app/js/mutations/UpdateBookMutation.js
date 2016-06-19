import Relay from "react-relay";

export default class UpdateBookMutation extends Relay.Mutation {

    getMutation() {
        return Relay.QL `mutation UpdateBookMutation{updateBook}`;
    }

    getVariables() {
        const {id, title} = this.props;
        return {id, title};
    }

    getFatQuery() {
        return Relay.QL `
        fragment on UpdateBookPayload{
            book
        }
    `;
    }

    getConfigs() {
        return [
            {
                type: "FIELDS_CHANGE",
                fieldIDs: {
                    book: this.props.id
                }
            }
        ];
    }
}
