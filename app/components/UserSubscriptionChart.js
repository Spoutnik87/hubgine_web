import React, { Component } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

class UserSubscriptionChart extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            index: PropTypes.any.isRequired,
            value: PropTypes.any.isRequired
        })).isRequired
    };

    render()
    {
        return (
            <ResponsiveContainer height={200}>
                <BarChart data={this.props.data.map((data, index) => ({
                                    name: data.index,
                                    Subscriptions: data.value
                                }))}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Subscriptions" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default UserSubscriptionChart;