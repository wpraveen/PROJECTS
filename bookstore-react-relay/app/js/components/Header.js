import React from "react";

export default class HelloWorld extends React.Component {

    openAddBookDrawer = () => {
        this.props.openAddBookDrawer();
    }

    render() {
        return (
            <div className="header">
                <h1>Book Store</h1>
                <button className="btn btn-primary float-right" onClick={this.openAddBookDrawer}>Add Book</button>
            </div>
        );
    }
}
