import React from "react";
import Relay from "react-relay";
import Line from "./Line";

class Lines extends React.Component {

    render() {
        const {lines} = this.props;

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
                        {lines.edges.map((line, index) => {
                            return (<Line limit="12"/>);
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Relay.createContainer(Lines, {
    initialVariables: {
        limit: 99999,
        filter: null
    },
    fragments: {
        bookStore: () => Relay.QL `
            fragment on transaction{
                line(first:$limit){
                    edges{
                      node{
                        id,
                        ${Line.getFragment("line")}
                      }
                    }

            }
        `,
        typeInfo: () => Relay.QL `
            fragment on typeInfo{
                lines{
                    discount{
                        enable
                    }

                    items{
                        ${Line.getFragment("typeInfo")}
                    }

                }
            }
        `

    }
});
