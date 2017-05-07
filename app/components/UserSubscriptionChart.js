import React, { Component } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

class UserSubscriptionChart extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            data: 
                this.props.data.map((data, index) => ({
                    name: data.index,
                    Subscriptions: data.value
                }))
        };
    }

    render()
    {
        return (
            <ResponsiveContainer height={200}>
                <BarChart data={this.state.data}>
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