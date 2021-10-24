import React, { Component } from 'react';
import './team-component.css';

class TeamComponent extends Component {
    constructor(props) {
        super(props);
   
        this.state = {
           channelName:'',
           channelNameValid: false,
        };
    }

    componentDidMount() {
        
    }

    formValidation = (e) => {
        const valid = e.target.value.length && isNaN(e.target.value[0]);
        this.setState({
            channelName: e.target.value,
            channelNameValid: valid,
        })
    }


    addChannelClicked = () =>{
        this.props.addChannel(this.state.channelName, this.props.teamIndex);
        this.setState({
            channelName: '',
            channelNameValid: false
        })
    }

    removeChannelClicked = (teamIndex, channelIndex) => {
        this.props.removeChannel(teamIndex,channelIndex)
    }
    
    sort=()=> {
        this.props.orderChannel(this.props.teamIndex);
    }
   
    render() {
        return (
        <div>
            {
                this.props.team && 
                <div>
                    <span className="team-name">{this.props.team.name}</span>
                    <button className="sort" onClick={this.sort}>&#8597;</button>
                    <span className="add-channel">
                        <input placeholder="Channel name" value={this.state.channelName} onChange={this.formValidation}/>
                        <button onClick={this.addChannelClicked} disabled={!this.state.channelNameValid}>&#8853;</button>
                    </span>
                </div>
            }
            {
                this.props.team &&
                <ul className="one">
        
                    { this.props.team.channels && this.props.team.channels.map((channel, idx) => (
                        <li className="channel-name" key={channel.index}>
                            <span>{channel.name}</span>
                            <button onClick={()=>this.removeChannelClicked(this.props.teamIndex, channel.index)}>&#8854;</button>
                        </li>
                    ))}
                </ul>
            }
        </div>
        );
    }
}

export default TeamComponent;
