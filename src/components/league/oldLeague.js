import React, {Component} from 'react'
import {Grid, Menu, Segment, Tab} from 'semantic-ui-react'
import SearchBar from './searchBar'

var sessionNames = [];
export default class OldLeague extends Component {
    state = {activeItem: 'فوتبال'}
    handleItemClick = (e, {name}) => this.setState({activeItem: name})
    getTableContent() {
        if (this.state.activeItem === 'فوتبال') {
            return (
                this.props.leaguesData['football'].map((leagueData) => {
                    return (
                        <div>
                            <div style={{backgroundColor: '#c1c1c1', margin: '0.5vh auto'}}>
                                {leagueData['leagueName']}
                            </div>
                            {/*<div>*/}
                                {/*{leagueData['sessions'].map((session) => {*/}
                                    {/*sessionNames.push(session);*/}
                                    {/*return (*/}
                                        {/*<a style={{display:'inline-block', margin:'0.5vh 1vw', color:'black'}} href={link}>{name}</a>*/}
                                    {/*)*/}
                                {/*})}*/}
                            {/*</div>*/}
                        </div>
                    )
                })

            )
        }
        else if (this.state.activeItem === 'بسکتبال') {
            return (
                this.props.leaguesData['basketball'].map((leagueData) => {
                    return (
                        <div>
                            <div style={{backgroundColor: '#c1c1c1', margin: '0.5vh auto'}}>
                                {leagueData['leagueName']}
                            </div>
                            {/*<div>*/}
                                {/*{leagueData['sessions'].map((session) => {*/}
                                    {/*sessionNames.push(session);*/}
                                    {/*return (*/}
                                        {/*<a style={{display:'inline-block', margin:'0.5vh 1vw', color:'black'}} href={link}>{name}</a>*/}
                                    {/*)*/}
                                {/*})}*/}
                            {/*</div>*/}
                        </div>
                    )
                })

            )
        }
    }

    render() {
        return (
            <Segment>
                <div style={{textAlign: 'center', fontSize: '1.5em', marginBottom: '1.4vh'}}>
                    {this.props.type}
                </div>
                <SearchBar sessionName={sessionNames} sessoinSelector={this.props.sessionName}/>
                <Menu pointing secondary>
                    <Menu.Item
                        name='فوتبال'
                        style={{width: '50%'}}
                        onClick={this.handleItemClick}
                        active={this.state.activeItem === 'فوتبال'}
                    />
                    <Menu.Item
                        style={{width: '50%  '}}
                        name='بسکتبال'
                        active={this.state.activeItem === 'بسکتبال'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
                <div>
                    {this.getTableContent()}
                </div>
            </Segment>
        );
    }

}