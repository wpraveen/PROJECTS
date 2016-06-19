import React from "react";
import Relay from "react-relay";
import DeleteBookMutation from "../mutations/DeleteBookMutation";

class Book extends React.Component {

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
        const {index, book} = this.props;
        const {id, title} = book;
        return (
            <tr>
                <th scope="row">{index}</th>
                <td><a onClick={(event) => this.updateBook(event, id)}>{title}</a></td>
                <td className="right-align"><button type="button" className="btn btn-danger" onClick={(event) => this.deleteBook(event, id)}>Delete</button></td>
            </tr>
        );
    }
}

export default Relay.createContainer(Book, {
    fragments: {
        bookStore: () => Relay.QL `
            fragment on BookStore{
                id
            }
        `,
        book: () => Relay.QL `
            fragment on Book{
                id,
                title
            }
        `
    }
});
