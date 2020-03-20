import {Anchor, Box, Button, Heading, Nav, Text} from "grommet";
import React from "react";
import {Analytics, Map} from "grommet-icons";
import {manipulateSizes} from "../Utils";
import {useHistory} from 'react-router-dom';

function AppBar(props) {

    const history = useHistory();

    return (
        <Box
            tag='header'
            direction='row'
            align='center'
            justify='between'
            margin={{top: manipulateSizes(props.size, 3), bottom: 'medium'}}
            pad='small'
            elevation='large'
            border={{
                size: 'medium',
                color: 'brand'
            }}
            round='small'
        >
            <Box direction='row' align='center'>
                <Box gridArea='left' direction='row' align='center' justify='start' gap='medium'
                     margin={{left: 'small'}}>
                    <Box justify='end' direction='column'>
                        <Anchor color='status-critical' href='#' icon={<Map/>}
                                label={<Heading level='3' margin='none'>MapVirus</Heading>}/>
                        {props.size !== 'small' && (
                            <Text color='dark-5' margin='none'>
                                Comprehensive maps and information on Novel Coronavirus
                            </Text>
                        )}
                    </Box>
                    <Nav>
                        <Anchor label='Prevention' onClick={() => {history.push('/prevention')}}/>
                    </Nav>
                </Box>
                {props.setShowSidebar && (
                    <Box gridArea='right' align='end'>
                        <Button icon={<Analytics/>} onClick={() => {
                            props.setShowSidebar(!props.showSidebar)
                        }}/>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default AppBar;