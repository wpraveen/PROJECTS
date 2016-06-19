import React from "react";
import Relay from "react-relay";
import DeleteBookMutation from "../mutations/DeleteBookMutation";

class Line extends React.Component {

    deleteBook(event, id){
        event.stopPropagation();

        console.log("Book id: ", id);

        const onSuccess = (response) => {
            console.log("Mutation successful!: response: ", response);
        };
        const onFailure = (transaction) => {
            let error = transaction.getError() || new Error("Mutation failed.");
            console.error(error);
        };

        const mutation = new DeleteBookMutation({id:id, bookStore: this.props.bookStore});

        Relay.Store.commitUpdate(mutation, {onFailure, onSuccess});
    }

    updateBook(event, id){
        event.stopPropagation();
        this.props.updateBook(id);
    }

    render() {
        const {amount, discount} = this.props;
        return (
            <tr>
                <td>{amount}</a></td>
                <td>{discount}</td>
            </tr>
        );
    }
}

export default Relay.createContainer(Line, {

    fragments: {
        line: () => Relay.QL `
            fragment on Line{
                amount,
                discount
            }
        `
        typeInfo: () => Relay.QL `
            fragment on Line{
                typeInfo{
                    discount
                }

            }
        `


    }
});
