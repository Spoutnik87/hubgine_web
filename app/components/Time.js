import React from 'react';

class Time extends React.Component {
    constructor(props) {
        super(props);
        let d = new Date();
        this.state = { elapsed: d.getDate() + "/" + (d.getMonth()+1) + d.getFullYear()  +  " " + d.getHours() + "/" + d.getMinutes() + "/" + d.getSeconds() };
        console.log("Set : state.elapsed = " + this.state.elapsed);
    }

    componentDidMount()
    {
        console.log("Component start");
        this.tick();
        this.timer = setInterval(() => { this.tick(); }, 1000);
    }

    componentWillUnmount()
    {
        console.log("Component stop");
        clearInterval(this.timer);
    }

    tick()
    {
        console.log('a');
        let d = new Date();
        this.state.elapsed = d.getDate() + "/" + (d.getMonth()+1) + d.getFullYear()  +  " " + d.getHours() + "/" + d.getMinutes() + "/" + d.getSeconds();
        this.forceUpdate();
        //console.log(this.state.elapsed);
        //() => { this.setState({elapsed: Math.round((new Date()).getTime()/1000)}); console.log(this.state.elapsed); };
        /*let d = new Date();
        this.state.elapsed = Math.round(d.getTime()/1000);
        this.forceUpdate();
        console.log(this.state.elapsed);*/
    }

    render() {
        let elapsed = this.state.elapsed;
        return <div>{this.state.elapsed}</div>;
    }
}

export default Time;