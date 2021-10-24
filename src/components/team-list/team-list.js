import React, { Component } from 'react';
import TeamComponent from '../team-component/team-component';
import './team-list.css';

class TeamList extends Component {
    constructor(props) {
        super(props);
        this.teams = [];
        this.teams.push({
            name: 'Team1',
            order: 0,
            channels: [{
              name: 'Channel1',
              index: 1
            },
            {
              name: 'Channel2',
              index: 2
            }]
        });
        this.teams.push({
            name: 'Team2',
            order: 0,
            channels: [{
              name: 'Channel1',
              index: 1
            },
            {
              name: 'Channel2',
              index: 2
            }]
        });
        this.order = {
            default: 0,
            asc: 1,
            desc: 2
        }
        this.state = {
            teams: this.teams,
            teamNameNew: '',
            teamNameValid: false,
        };
    }
    orderChannel = (teamIndex) => {
        const teamOrder = this.state.teams[teamIndex].order > 1 ? 0 : this.state.teams[teamIndex].order+1;
        let newTeam;

        if (teamOrder === this.order.default){ 
            newTeam = this.state.teams.map((team, i)=> {
                if(i===teamIndex){
                    return({
                        ...team,
                        order: teamOrder,
                        channels: team.channels.sort((a,b)=>(a.index-b.index))
                    })
                }else{
                    return {...team}
                }
            
            })
        }else if(teamOrder === this.order.asc){
    
            newTeam = this.state.teams.map((team, i)=> {
                if(i===teamIndex){
                    return({
                        ...team,
                        order: teamOrder,
                        channels: team.channels.sort((a,b)=>(a.name>b.name) ? 1: -1)
                        })
                }else{
                    return {...team}
                }});
        }else{
            newTeam = this.state.teams.map((team, i)=> {
                if(i===teamIndex){
                    return({
                        ...team,
                        order: teamOrder,
                        channels: team.channels.sort((a,b)=>(b.name>a.name) ? 1: -1)
                        })
                }else{
                    return {...team}
                }});
        }
        this.setState({
            teams: newTeam
        });
    
    }

    formValidation=(e)=> {
        const valid = e.target.value.length && isNaN(e.target.value[0])
        this.setState({
            teamNameNew: e.target.value,
            teamNameValid: valid,
        })
    }

    addChannel = (name, idx) => {
        const newTeam = this.state.teams.map((team, i)=> i===idx ? {...team, channels: team.channels.concat({name, index: team.channels.length+1})} : {...team})
        
        this.setState({
            teams: newTeam
        })
    }

    removeChannel = (teamIndex, channelIndex) => {
  
        const newTeam = this.state.teams.map((team, i)=> i===teamIndex ? {...team, channels: team.channels.filter(channel=> channel.index !== channelIndex) }: {...team})
        
        this.setState({
            teams: newTeam
        })
    }

    addTeam = () => {
        const newTeam = {
            name: this.state.teamNameNew,
            order: 0,
            channels: []
        };
        this.setState({
            teams: this.state.teams.concat(newTeam),
            teamNameNew:'',
            teamNameValid: false
        })
    }


    render() {
       
        return (
            <div>
                <div className="teams-list">
                    <ul>
                            
                        { this.state.teams && this.state.teams.map((team, idx) => {
                           return (
                            <li key={idx}>
                                <TeamComponent team={team} teamIndex={idx} addChannel={this.addChannel} removeChannel={this.removeChannel} orderChannel={this.orderChannel}/>
                            </li>
                        )})}
                    </ul>  
                </div>
                <div className="add-team">
                    <b>Add Team</b>
                    <input placeholder="Team name" value={this.state.teamNameNew} onChange={this.formValidation}/>
                    <button disabled={!this.state.teamNameValid} onClick={this.addTeam}>&#8853;</button>
                </div>
            </div>
        );
    }
}

export default TeamList;
