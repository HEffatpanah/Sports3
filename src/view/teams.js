import _ from 'lodash'
import React, { Component } from 'react'
import { Grid, Segment, Table, Dropdown} from 'semantic-ui-react'
import Template from '../components/template'
import MatcheInfo from '../components/matcheInfo'

const matchData = [
    { owerTeamGoal:'3', opponentTeamGoal:'0', date:'1998-09-12', score:3, status:"win"  },
    { owerTeamGoal:'2', opponentTeamGoal:'0', date:'1998-09-12', score:1, status:"win"  },
    { owerTeamGoal:'3', opponentTeamGoal:'0', date:'1998-09-12', score:3, status:"win"  },
    { owerTeamGoal:'3', opponentTeamGoal:'0', date:'1998-09-12', score:3, status:"win"  },
];

class Matches extends Component {
    state = {
        column: null,
        data: matchData,
        direction: null,
    };

    handleSort = clickedColumn => () => {
        const { column, data, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }
    getTableData (){
        return(
            this.state.data.map((data) => {
                    return(
                        <MatcheInfo matchInfo={data}/>
                    )
                }
            )
        )
    };
    render() {
        const { column, data, direction } = this.state

        return (
            <Table sortable celled fixed color={'#1b5b78'} inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            // sorted={column === 'result' ? direction : null}
                            // onClick={this.handleSort('result')}
                        >
                            Result
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'date' ? direction : null}
                            onClick={this.handleSort('date')}
                        >
                            Date
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'score' ? direction : null}
                            onClick={this.handleSort('score')}
                        >
                            Score
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'win/lose/draw' ? direction : null}
                            onClick={this.handleSort('win/lose/draw')}
                        >
                            Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.getTableData()}
                </Table.Body>
            </Table>
        )
    }
}

// const center_vertically={
//     position: 'absolute',
//     top: '50%',
//     transform: 'translateY(-50%)',
// }


const image_style={
    height:'8vh',
    width:'5vw',
}

const membersData = [
    { name:'ali', age:'22', position:'forward', photo:<img style={image_style} src={require('../images/horse.jpg')}/>},
    { name:'mahdi', age:'25', position:'defence', photo:<img style={image_style} src={require('../images/horse.jpg')}/>},
    { name:'taha', age:'21', position:'forward', photo:<img style={image_style} src={require('../images/horse.jpg')}/>},
    { name:'mammad', age:'29', position:'defence', photo:<img style={image_style} src={require('../images/horse.jpg')}/>},
]

class TeamMembers extends Component{
    state = {
        column: null,
        // data: _.sortBy(membersData, ['name']),
        data: membersData,
        direction: null,
        filterItem: null,
        filterEnable:false,
    };

    handleSort = clickedColumn => () => {
        const { column, data, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            });

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    };
    handleSelectorChange = (selectedOption) => {
        this.setState({ filterItem:selectedOption.value });

    };
    handleCheckBox = () => {
        if(this.state.filterEnable){
            this.setState({filterEnable:false})
        }
        else{
            this.setState({filterEnable:true})
        }
    };
    render() {
        const options = [
            { value: 'forward', label: 'forward' },
            { value: 'defence', label: 'defence' },
        ];

        const body = _.map(this.state.data, ({ name, age, position, photo}) => {
            if(this.state.filterEnable){
                if(position===this.state.filterItem)
                    return (
                        <Table.Row>
                            <Table.Cell>{name}</Table.Cell>
                            <Table.Cell>{age}</Table.Cell>
                            <Table.Cell>{position}</Table.Cell>
                            <Table.Cell style={{textAlign: 'center'}}>{photo}</Table.Cell>
                        </Table.Row>
                    )
            }

            else
                return(
                    <Table.Row>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{age}</Table.Cell>
                        <Table.Cell>{position}</Table.Cell>
                        <Table.Cell style={{textAlign: 'center'}}>{photo}</Table.Cell>
                    </Table.Row>
                )
        });

        const { column, direction } = this.state;
        return (
            <div>
                <Segment>
                    <Grid>
                        <Grid.Row columns={2}>
                            {/*<Grid.Column width={13}>*/}
                            {/*<Select placeholder='Select Position' search selection options={options} onChange={this.handleSelectorChange}/>*/}
                            {/*</Grid.Column>*/}
                            {/*<Grid.Column width={3}>*/}
                            {/*<Checkbox style={center_vertically} label='Filter' onChange={this.handleCheckBox} />*/}
                            {/*</Grid.Column>*/}
                            <Grid.Column style={{textAlign:'right'}} width={16}>
                                <Dropdown text='Filter Posts' icon='filter'>
                                    <Dropdown.Menu>
                                        {/*<Input icon='search' iconPosition='left' className='search' />*/}
                                        {/*<Dropdown.Divider />*/}
                                        <Dropdown.Menu scrolling>
                                            {options.map(option => <Dropdown.Item key={option.value} {...option} />)}
                                        </Dropdown.Menu>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Table sortable celled fixed style={{}}>
                                    <Table.Header >
                                        <Table.Row>
                                            <Table.HeaderCell
                                                sorted={column === 'name' ? direction : null}
                                                onClick={this.handleSort('name')}
                                            >
                                                Name
                                            </Table.HeaderCell>
                                            <Table.HeaderCell
                                                sorted={column === 'age' ? direction : null}
                                                onClick={this.handleSort('age')}
                                            >
                                                Age
                                            </Table.HeaderCell>
                                            <Table.HeaderCell
                                                sorted={column === 'position' ? direction : null}
                                                onClick={this.handleSort('position')}
                                            >
                                                Position
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                Photo</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>{body}
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        )
    }
}


class App extends Component {
    render(){
        const news =
            <Segment>

                <a id="ew" href="https://www.google.com">news</a><br/>
                <a href="https://www.google.com">ews</a><br/>
                <a href="https://www.google.com">news</a><br/>
                <a href="https://www.google.com">news</a><br/>
                <a href="https://www.google.com">news</a><br/>
                <a href="https://www.google.com">news</a><br/>
                <a href="https://www.google.com">news</a><br/>
                <a href="https://www.google.com">news</a><br/>
            </Segment>;
        const body =
            <Grid style={{width:'100%'}}>
                <Grid.Row columns={3}>
                    <Grid.Column width={4}>
                        <Matches/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <TeamMembers/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        {news}
                    </Grid.Column>
                </Grid.Row>
            </Grid>;

        return(
            <Template {...this.props} body={body} />

        )
    }
}
export default App