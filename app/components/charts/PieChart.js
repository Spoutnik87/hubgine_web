import React, { Component } from "react";
import PropTypes from "prop-types";
import { ResponsiveContainer, PieChart as PieChartRechart, Pie, Cell, Legend } from "recharts";

class PieChart extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
            }).isRequired
        ).isRequired,
        colors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        legend: PropTypes.bool,
        label: PropTypes.bool
    };

    static defaultProps = {
        colors: [ "#0088FA", "#00C49C", "#FFBB27", "#FF8037" ],
        legend: false,
        label: false
    };

    render()
    {
        const {
            data,
            colors,
            legend,
            label
        } = this.props;
        return (
            <ResponsiveContainer height={300}>
                <PieChartRechart>
                    <Pie data={data} dataKey="value" startAngle={180} endAngle={0} innerRadius={60} outerRadius={80} paddingAngle={5} fill="#8884d8" label={label}>
                    {
                        colors.map((color, index) => <Cell key={index} fill={color}/>)
                    }
                    </Pie>
                    { legend ? <Legend verticalAlign="bottom"/> : undefined }
                </PieChartRechart>
            </ResponsiveContainer>
        );
    }
}

export default PieChart;