import Relay from "react-relay";

export default class BookStoreRoute extends Relay.Route {
    static routeName = "bookStoreRoute";
    static queries = {
        bookStore: () => Relay.QL `
            query{
                bookStore
            }
        `
    };
}
