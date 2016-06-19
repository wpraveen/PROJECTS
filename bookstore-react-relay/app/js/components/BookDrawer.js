import React from "react";
import Relay from "react-relay";
import AddBookMutation from "../mutations/AddBookMutation";
import UpdateBookMutation from "../mutations/UpdateBookMutation";

class BookDrawer extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();

        const onSuccess = (response) => {
            console.log("Mutation successful!: response: ", response);
            this.props.closeAddBookDrawer();
        };
        const onFailure = (transaction) => {
            let error = transaction.getError() || new Error("Mutation failed.");
            console.error(error);
        };
        let mutation;
        if (this.props.node) {
            mutation = new UpdateBookMutation({"title": this.title.value, "id": this.props.node.id});
        } else {
            mutation = new AddBookMutation({"title": this.title.value, "bookStore": this.props.bookStore});
        }

        Relay.Store.commitUpdate(mutation, {onFailure, onSuccess});
    }

    closeAddBookDrawer = () => {
        this.props.closeAddBookDrawer();
    }

    render() {
        let title = "", submitBttnText = "Add Book";
        const {node} = this.props;
        if (node) {
            title = node.title;
            submitBttnText = "Update Book";
        }

        return (
            <div className="add-book-drawer">
                <h1>Book</h1>
                <form className="add-book form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" ref={c => this.title = c} defaultValue={title} className="form-control" id="title" placeholder="Add a Book Title"/>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn" onClick={this.closeAddBookDrawer}>Cancel</button>
                        <button type="submit" className="btn btn-primary  float-right">{submitBttnText}</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Relay.createContainer(BookDrawer, {
    fragments: {
        bookStore: () => Relay.QL `
            fragment on BookStore{
                id
            }
        `,
        node: () => Relay.QL `
            fragment on Book{
                id,
                title
            }
        `
    }
});
