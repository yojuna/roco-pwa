import React, { Component } from "react";
import PropTypes from "prop-types";

import ReactNipple from "react-nipple";
import DebugView from "react-nipple/lib/DebugView";
import "react-nipple/lib/styles.css";

class ROSJoystick extends Component {
    static propTypes = {
        title: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        options: PropTypes.object,
        state: PropTypes.object
    };
    state = {
        data: undefined
    };
    render() {
        return (
            <div className="ROSJoystick">
                <h2>{this.props.title}</h2>
                <ReactNipple
                    className="joystick"
                    options={this.props.options}
                    style={{
                        outline: `1px dashed ${this.props.options.color}`,
                        width: this.props.width,
                        height: this.props.height
                    }}
                    onStart={this.handleJoystickStart}
                    onEnd={this.handleJoystickEnd}
                    onMove={this.handleJoystickMove}
                    onDir={this.handleJoystickDir}
                    onPlain={this.handleJoystickPlain}
                    onShown={this.handleJoystickShown}
                    onHidden={this.handleJoystickHidden}
                    onPressure={this.handleJoystickPressure}
                />
                <DebugView data={this.state.data} />
            </div>
        );
    }

    handleJoystickStart = (evt, data) => {
        this.setState({ data });
    };
    handleJoystickEnd = (evt, data) => {
        this.setState({ data });
    };
    handleJoystickMove = (evt, data) => {
        this.setState({ data });
    };
    handleJoystickDir = (evt, data) => {
        this.setState({ data });
    };
    handleJoystickPlain = (evt, data) => {
        this.setState({ data });
    };
    handleJoystickShown = (evt, data) => {
        this.setState({ data });
    };
    handleJoystickHidden = (evt, data) => {
        this.setState({ data });
    };
    handleJoystickPressure = (evt, data) => {
        this.setState({ data });
    };
}

export default ROSJoystick


// data: _propTypes2.default.shape({
//     position: _propTypes2.default.shape({
//         x: _propTypes2.default.number,
//         y: _propTypes2.default.number
//     }),
//     angle: _propTypes2.default.shape({
//         radian: _propTypes2.default.number,
//         degree: _propTypes2.default.number
//     }),
//     direction: _propTypes2.default.shape({
//         x: _propTypes2.default.number,
//         y: _propTypes2.default.number,
//         angle: _propTypes2.default.number
//     }),
//     force: _propTypes2.default.number,
//     pressure: _propTypes2.default.number,
//     distance: _propTypes2.default.number
// })
// }



// const JoystickState = atom({
//     key: 'joystickstate', // unique ID (with respect to other atoms/selectors)
//     default: '', // default value (aka initial value)
//   });


//   NavMapComp.propTypes = {
//     ros: PropTypes.object,
//     divID: PropTypes.string,
//     width: PropTypes.number,
//     height: PropTypes.number,
//     serverName: PropTypes.string
//   }