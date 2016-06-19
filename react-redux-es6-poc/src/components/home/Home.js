import React from "react";
import {Link} from "react-router";

class HomePage extends React.Component {

    render() {
        return (

            <div className="jumbotron">
                <h1>Administartion</h1>

                <Link to="about" className="btn btn-primary btn-lg">About</Link>
            </div>

        );
    }
}


export default HomePage;
