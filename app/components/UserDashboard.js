import React from 'react';
import { getAccountList } from '../util/api';
import { connect } from 'react-redux';
import { updateAccountList } from '../actions/accounts';
import LoadingCog from './LoadingCog';

class UserDashboard extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isLoaded: false
        };
    }

    componentDidMount() {
        getAccountList(this.props.user.email, this.props.user.token, (error, result) => {
            if (!error)
            {
                this.props.dispatch(updateAccountList(result.accounts));
                this.setState({ isLoaded: true });
            }
            else
            {
                this.props.dispatch(sendFailureMessage([{ msg: "An error happened during account list loading." }]));
            }
        });
    }    
    
    render()
    {
        let tabs;
        let menu;
        let content = (
            <div>
                {  }
            </div>
        );
        if (this.state.isLoaded)
        {
            /*tabs = (
                <div className="panel-body">
                    <ul className="nav nav-tabs">
                        { this.props.accounts.map((account, index) => (
                            <li key={index} className={ this.props.location.hash == "#" + index ? "active" : "" }><a href={ "#" + index }>{account.name}</a></li>
                         ) ) }
                    </ul>
                    {content}
                </div>
            );*/

            /*leftMenu = (
                <div className="col-md-2 sidenav">
                    Hello
                </div>
            );*/
            const overviewActive = this.props.location.hash == ("#" | "");
            /*menu = (
                <ul className="nav nav-tabs">
                    <li className={overviewActive ? "active" : ""}><a href="#">Overview</a></li>
                    <li><a href="#oui">Oui</a></li>
                </ul>
            );*/
        }
        else
        {
            tabs = (
                <div className="panel-body" style={ { textAlign: "center" } }>
                    <LoadingCog/>
                </div>
            );
        }

        return (
            <div>
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <div className="panel">
                        <div className="panel-heading">
                            <h3 className="panel-title">DASHBOARD</h3>
                        </div>
                        <div className="panel-body">
                            {menu}
                            {tabs}
                        </div>
                    </div>
                </div>
                <div className="col-md-1"></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    lang: state.lang,
    user: state.user,
    accounts: state.accounts
  };
};

export default connect(mapStateToProps)(UserDashboard);