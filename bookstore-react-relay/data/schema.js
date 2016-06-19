import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean
} from "graphql";

import {
    globalIdField,
    toGlobalId,
    fromGlobalId,
    connectionDefinitions,
    connectionArgs,
    connectionFromArray,
    nodeDefinitions,
    mutationWithClientMutationId,
    cursorForObjectInConnection
} from "graphql-relay";

import {getBooks, getBook, addBook, deleteBook, updateBook} from "./database";

class BookStore {}
let bookStore = new BookStore();
class Book {
    constructor({id, title}) {
        this.id = id;
        this.title = title;
    }
}



let {nodeInterface, nodeField} = nodeDefinitions((globalId) => {
    let {type, id} = fromGlobalId(globalId);
    console.log("type and id: ", type, id);
    switch (type) {
        case "BookStore":
            return bookStore;
        case "Book":
            return (new Book(getBook(id)));
        default:
            return null;
    }

}, (obj) => {

    console.log("Obj: ", obj);
    if (obj instanceof BookStore) {
        return bookStoreType;
    }

    if (obj instanceof Book) {
        return bookType;
    }
    return null;
});

let bookType = new GraphQLObjectType({
    name: "Book",
    interfaces: [nodeInterface],
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) => toGlobalId("Book", obj.id)
        },
        title: {
            type: GraphQLString
        },
        available: {
            type: GraphQLBoolean
        }
    })
});

const bookConnection = connectionDefinitions({name: "Book", nodeType: bookType});

const bookStoreType = new GraphQLObjectType({
    name: "BookStore",
    interfaces: [nodeInterface],
    fields: () => ({
        id: globalIdField("BookStore"),
        "books": ({
            type: bookConnection.connectionType,
            args: {
                ...connectionArgs,
                query: {
                    type: GraphQLString
                }
            },
            resolve: (_, args) => {
                return connectionFromArray(getBooks(args), args);
            }
        })
    })
});

const query = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        node: nodeField,
        bookStore: {
            type: bookStoreType,
            resolve: () => (bookStore)
        }
    })
});

const addBookMutation = mutationWithClientMutationId({
    name: "AddBook",
    inputFields: {
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        available: {
            type: GraphQLBoolean
        }
    },
    //This define the Payload fragment.
    outputFields: {
        bookEdge: {
            type: bookConnection.edgeType,
            resolve: (book) => {
                const edge = {
                    cursor: cursorForObjectInConnection(getBooks(), book),
                    node: book
                };

                console.log("Created edge: ", edge);
                return edge;
            }
        },

        bookStore: {
            type: bookStoreType,
            resolve: () => bookStore
        }
    },
    mutateAndGetPayload: ({title}) => {

        console.log("Adding book with title: ", title);
        const addedBook = addBook(title);
        console.log("addedBook: ", addedBook);
        return addedBook;
    }
});

const deleteBookMutation = mutationWithClientMutationId({
    name: "DeleteBook",
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    //This define the Payload fragment.
    outputFields: {
        deletedBookId: {
            type: GraphQLID,
            resolve: ({id}) => id
        },
        bookStore: {
            type: bookStoreType,
            resolve: () => bookStore
        }
    },
    mutateAndGetPayload: ({id}) => {
        let {id: localId} = fromGlobalId(id);
        deleteBook(localId);
        return {id};
    }
});

const updateBookMutation = mutationWithClientMutationId({
    name: "UpdateBook",
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        title: {
            type: GraphQLString
        }
    },
    outputFields: {
        book: {
            type: bookType,
            resolve: ({localId}) => getBook(localId)
        }
    },
    mutateAndGetPayload: ({id, title}) => {
        console.log("id and text: ", id, title);
        let {id: localId} = fromGlobalId(id);
        updateBook({id:localId, title});
        return {localId};
    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({addBook: addBookMutation, updateBook: updateBookMutation, deleteBook: deleteBookMutation})
});

const schema = new GraphQLSchema({query, mutation});
export default schema;
