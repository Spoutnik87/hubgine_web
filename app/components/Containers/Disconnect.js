import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
            disconnect
        }, dispatch)
    };
};

export default withRouter(connect(null, mapDispatchToProps)(Disconnect));