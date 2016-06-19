import React from "react";
import Relay from "react-relay";
import Header from "./Header";
import Home from "./Home";
import BookDrawer from "./BookDrawer";
import NodeRoute from "../routes/NodeRoute";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            view: "HOME"
        };
    }

    closeAddBookDrawer = () => {
        this.setState({view: "HOME"});
    }

    openAddBookDrawer = () => {
        this.setState({view: "ADD_BOOK"});
    }

    updateBook = (id) => {
        console.log("going to update book: id: ", id);
        this.setState({"view": "UPDATE_BOOK", "bookId": id});
    }

    handleRenderFetched =(data) =>{
        return <BookDrawer {...data} closeAddBookDrawer={this.closeAddBookDrawer}/>;
    }

    renderView() {
        const {bookStore} = this.props;
        const {view, bookId} = this.state;
        if (view === "ADD_BOOK") {
            return <BookDrawer bookStore={bookStore} closeAddBookDrawer={this.closeAddBookDrawer}/>;
        } else if (view === "UPDATE_BOOK") {
            return <Relay.RootContainer renderFetched={this.handleRenderFetched} Component={BookDrawer} route={new NodeRoute({"id": bookId})}/>;
        }
    }

    render() {
        const {bookStore} = this.props;
        return (
            <div className="book-store">
                <Header openAddBookDrawer={this.openAddBookDrawer} />
                <div className="content">
                    {this.renderView()}
                    <Home bookStore={bookStore} updateBook={this.updateBook}/>
                </div>
            </div>
        );
    }
}

export default Relay.createContainer(App, {
    fragments: {
        bookStore: () => Relay.QL `
            fragment on BookStore{
                ${Home.getFragment("bookStore")}
                ${BookDrawer.getFragment("bookStore")}
            }
        `
    }
});
