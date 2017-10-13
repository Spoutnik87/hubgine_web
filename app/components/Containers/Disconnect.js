import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeCookie } from "redux-cookie";
import { withRouter } from "react-router-dom";
import { disconnect } from "../../actions/user";
import LoadingCog from "../LoadingCog";

class Disconnect extends Component {
    shouldComponentUpdate()
    {
        return false;
    }

    componentWillMount()
    {
        this.props.actions.disconnect();
        this.props.actions.removeCookie("user");
        this.props.history.push("/");
    }
  
    render()
    {
        return <LoadingCog center />;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            disconnect,
            removeCookie
        }, dispatch)
    };
};

export default withRouter(connect(null, mapDispatchToProps)(Disconnect));