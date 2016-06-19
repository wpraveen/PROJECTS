import React from "react";
import Relay from "react-relay";
import Books from "./Books";

class Home extends React.Component {


    render() {
        const {bookStore, updateBook} = this.props;

        return (
            <div>
                <Books bookStore={bookStore} updateBook={updateBook}/>
            </div>
        );
    }
}

export default Relay.createContainer(Home, {
    fragments: {
        bookStore: () => Relay.QL `
            fragment on BookStore{
                ${Books.getFragment("bookStore")}
            }
        `
    }
});
