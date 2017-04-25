import React, { Component } from 'react';

class AccountEditForm extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isEdited: false

        };
    }

    render() {
        return (
            isEdited ?
            <div>
                
            </div>
            :
            <div>

            </div>
        );
    }
}

export default AccountEditForm;