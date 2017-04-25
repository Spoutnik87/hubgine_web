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
                this.setState({ isLoaded: true });
                this.props.dispatch(updateAccountList(result.accounts));
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
        let content = (
            <div>
                {  }
            </div>
        );
        if (this.state.isLoaded)
        {
            tabs = (
                <div className="panel-body">
                    <ul className="nav nav-tabs">
                        { this.props.accounts.map((account, index) => (
                            <li key={index} className={ this.props.location.hash == "#" + index ? "active" : "" }><a href={ "#" + index }>{account.name}</a></li>
                         ) ) }
                    </ul>
                    {content}
                </div>
            );
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
            <div className="container">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">DASHBOARD</h3>
                    </div>
                    {tabs}
                </div>
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