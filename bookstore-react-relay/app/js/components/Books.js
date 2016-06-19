import React from "react";
import Relay from "react-relay";
import Book from "./Book";

class Books extends React.Component {

    // componentWillReceiveProps(nextProps) {
    //     //const {query} = nextProps;
    //     //this.props.relay.setVariables({"filter": query});
    // }
    render() {
        const {bookStore, updateBook} = this.props;
        const {books} = bookStore;

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Book</th>
                            <th className="right-align">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.edges.map((book, index) => {
                            book = book.node;
                            return (<Book key={book.id} updateBook={updateBook} bookStore={bookStore} book={book} index={index + 1}/>);
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Relay.createContainer(Books, {
    initialVariables: {
        limit: 99999,
        filter: null
    },
    fragments: {
        bookStore: () => Relay.QL `
            fragment on BookStore{
                ${Book.getFragment("bookStore")}
                books(first:$limit){
                    edges{
                      node{
                        id,
                        ${Book.getFragment("book")}
                      }
                    }
                  }
            }
        `
    }
});
