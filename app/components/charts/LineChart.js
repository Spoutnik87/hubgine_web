import React, { Component } from "react";
import PropTypes from "prop-types";
import { ResponsiveContainer, LineChart as LineChartRechart, CartesianGrid, XAxis, YAxis, Line, Tooltip } from "recharts";

class LineChart extends Component {
    static propTypes = {
        xLabel: PropTypes.string,
        yLabel: PropTypes.string,
        color: PropTypes.string,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
            }).isRequired
        ).isRequired,
        label: PropTypes.string
    };

    static defaultProps = {
        color: "#FFFFFF"
    };

    render()
    {
        const {
            xLabel,
            yLabel,
            color,
            data,
            label
        } = this.props;
        return (
            <ResponsiveContainer height={300}>
                <LineChartRechart data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name" label={xLabel ? { value: xLabel, offset: 0, position: "insideBottom" } : undefined}/>
                    <YAxis label={yLabel ? { value: yLabel, angle: -90, position: "insideLeft" } : undefined}/>
                    <Line name={label} type="monotone" dataKey="value" fill={color} dot={false}/>
                    <Tooltip/>
                </LineChartRechart>
            </ResponsiveContainer>
        );
    }
}

export default LineChart;