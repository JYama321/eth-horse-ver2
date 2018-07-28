import React, { Component } from 'react'
import PropTypes from 'prop-types'
const gif = 'https://image.eth-horse.com/static_assets/loading_default.gif';

class LoadingHorseStatus extends Component{
    static propTypes = {
        isLeft: PropTypes.bool.isRequired
    };
    render(){
        return(
            <div style={{
                width: '225px',
                height: '320px',
                marginLeft: this.props.isLeft ? '0' : '56px',
                marginBottom: '3%',
                position: 'relative',
                backgroundColor: 'transparent'
            }}>
                <img
                    src={gif}
                    style={{
                        width: '50px',
                        height: '50px',
                        position: 'absolute',
                        left: '50%',
                        top: '50px',
                        transform: 'translate(-50%,-50%)',
                        background: 'transparent'
                    }}
                />
            </div>
        )
    }
}

export default LoadingHorseStatus;