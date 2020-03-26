import {Box, Clock, Heading, Layer, Table, TableBody, TableCell, TableHeader, TableRow, Text} from "grommet";
import AppBar from "../components/AppBar";
import BarContainer from "../components/BarContainer";
import CDCNotice from "../components/CDCNotice";
import SearchBarWrapper from "../components/SearchBarWrapper";
import MapWrapper from "../components/MapWrapper";
import SidebarWrapper from "../components/SidebarWrapper";
import React, {useEffect, useState} from "react";
import AppFooter from "../components/AppFooter";
import {Helmet} from "react-helmet";
import {fetchCountries} from "../components/Network";
import {useHistory} from "react-router-dom";
import {API_ROOT} from "../components/Constants";
import RegionTable from "../components/RegionTable";
import DistributionTable from "../components/DistributionTable";
import {Emergency, FingerPrint, Validate} from "grommet-icons";

export default function MainScreen(props) {

    const [loading, setLoading] = useState(true);
    const [config, setConfig] = useState(true);

    const [showSidebar, setShowSidebar] = useState(false);
    const [mapSelection, setMapSelection] = useState('');
    const [countries, setCountries] = useState([]);
    const [subRegion1, setSubRegion1] = useState({});
    const [fetchingRegion, setFetchingRegion] = useState(false);

    const history = useHistory();

    const size = props.size;

    useEffect(() => {
        fetch(API_ROOT + "/config", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then((json) => {
                setConfig(json);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                window.location.href = '/503';
            });
        fetchCountries({
            setCountries: setCountries
        }).catch((error) => {
            console.log(error);
            history.push('/503');
        })
    }, []);


    const allProps = {
        showSidebar: showSidebar,
        setShowSidebar: setShowSidebar,
        mapSelection: mapSelection,
        setMapSelection: setMapSelection,
        countries: countries,
        setCountries: setCountries,
        subRegion1: subRegion1,
        setSubRegion1: setSubRegion1,
        fetchingRegion: fetchingRegion,
        setFetchingRegion: setFetchingRegion,
        config: config,
        setConfig: setConfig
    };

    return loading ? (
        <Layer full>
            <Box full fill justify='center' align='center'>
                <Text>Loading...</Text>
            </Box>
        </Layer>
    ) : (
        <>
            <Helmet>
                <title>MapVirus - A Coronavirus Tracker</title>

                <meta name="keywords"
                      content="covid-19, coronavirus, corona, virus, map, tracking, statistics, trends, data, dashboard, information"/>
                <meta name="description"
                      content="Tracking the Coronavirus Outbreak with Numbers: Realtime maps and information on the development of Novel Coronavirus (COVID-19)."/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://mapvirus.com/"/>
                <meta name="og:title" property="og:title"
                      content="MapVirus - Realtime Maps and Information on Coronavirus (COVID-19)"/>
                <meta name="og:description" property="og:description"
                      content="MapVirus is a tracker and dashboard for Coronavirus (COVID-19) with realtime maps and information compiled from authoritative sources."/>
            </Helmet>
            <AppBar showSidebar={showSidebar} size={size}/>
            {/*<AppBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} size={size}/>*/}
            <BarContainer
                background='status-critical'
                margin={{bottom: 'medium'}}
                round='small'
            >
                <CDCNotice/>
            </BarContainer>

            <BarContainer wrap
                          background='dark-3'
                          margin={{bottom: 'medium'}}>
                <Heading level={4} margin='none'>Global Statistics</Heading>
                <Clock type="digital"/>
                <Box wrap>
                    <Box direction='row' align='center' gap='small'>
                        <FingerPrint/>
                        <Text>{config.global_stats.confirmed} Confirmed</Text>
                    </Box>
                    <Box direction='row' align='center' gap='small'>
                        <Emergency/>
                        <Text>{config.global_stats.deaths} Deaths</Text>
                    </Box>
                    <Box direction='row' align='center' gap='small'>
                        <Validate/>
                        <Text>{config.global_stats.recovered} Recovered</Text>
                    </Box>
                </Box>
            </BarContainer>

            <Box wrap direction='row'
                 margin={{bottom: 'medium'}}>
                <SearchBarWrapper size={size} {...allProps} />
                <MapWrapper size={size} {...allProps}/>
                <SidebarWrapper size={size} {...allProps}/>
            </Box>

            {Object.keys(subRegion1).length > 0 && subRegion1.regions.length < 200 && (
                <Box direction='row' alignContent='stretch' justify='between' gap='medium' wrap={size === 'small'}>
                    <RegionTable subRegion1={subRegion1} size={size}/>
                    <DistributionTable subRegion1={subRegion1} size={size}/>
                </Box>
            )}

            <AppFooter setOverlay={props.setOverlay}/>
            {props.overlay}
        </>
    );
}