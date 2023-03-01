// App.js
import React, { Component } from 'react';
import { StyleSheet, View,Text, Platform, PixelRatio, Dimensions } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class Table1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HeadTable: ['Head1', 'Head2', 'Head3', 'Head4', 'Head5'],
      DataTable: [
        ['Location', 'West Asia, eastern end of the Mediterranean, part of the Levant'],
        ['Time zone', 'GTM +2'],
        ['Area', '10,452 km2 (world 170th largest)'],
        ['Land boundaries', '454km'],
        ['Coastline', '225km'],
        ['Climate', 'Mediterranean - mild to cool, wet winters with hot, dry summers; Lebanon mountains experience heavy winter snows'],
        ['Terrain', 'Primarily narrow coastal plains, but two sets of mountains, one separating Beirut from the Bekaa Valley (Mount Lebanon) and one separating Lebanon from Syria (Anti-Lebanon Mountains). Elevation up to 3,088m'],
        ['Natural resources', 'Limestone, iron ore, salt, water-surplus, and arable land'],
        ['Environmental issues', 'Earthquakes, floods, sandstorms, deforestation, soil erosion, desertification, air pollution in Beirut from traffic and the burning of industrial wastes, pollution of coastal waters from raw sewage and oil spills']
      ],
      DataTable2: [
        ['Population (July 2014 estimates)', '5,882,568 (world 110 largest)'],
        ['Capital', 'Beirut (2,022,000)'],
        ['Other large cities', 'Tripoli (850,000), Saida (250,000), Zahle (200,000), Baalbek (105,000)'],
        ['Languages', 'Arabic (official), French, English, Armenian'],
        ['Religions', 'Muslim  (Sunni, Shia, Druze), Christian (includes Maronite Catholic, Greek Orthodox, Greek Catholic, and other Christians)'],
        ['Population growth rate (2013-2014)', '9.3 % (world largest growth rate due to the influx of refugees)'],
        ['Economy', 'Free-market economy, not restricting foreign investment. But suffers from corruption, red tape, arbitrary licensing decisions, complex customs procedures, high tariffs and fees, and weak intellectual property rights Sectors: Service 75%, industry 20%, agriculture 5%'],
        ['Opening hours', 'Government offices: 8.00am - 2.00pm\n\nPrivate offices and stores: 8.00am - 5.00pm\n\nBanks: 8.00am - 14.00pm weekdays, 8.00am - 12.00pm weekends'],
      ],
      DataTable3: [
        ['Conventional name', 'Lebanese Republic'],
        ['Local name', 'Lubnan'],
        ['Independence', 'November 22nd 1943 (from League of Nations mandate under French administration)'],
        ['Constitution', 'Adopted 23 May 1926. Amended several times, last in 2004'],
        ['Legal system', 'Mixed legal system of civil law based on the French civil code, Ottoman legal tradition, and religious laws covering personal status, marriage, divorce, and other family relations of the islamic and christian communities'],
        ['Suffrage', '21 years'],
        ['Head of state', 'The President'],
        ['Head of government: ', 'The Prime Minister'],
        ['Security forces', 'Lebanese Armed Forces (LAF) is the Lebanese military consisting of Lebanese Army, Lebanese Navy, and Lebanese Air Force.\n\nInternal Security forces (!SF) is the Lebanese police force\n\nGeneral Directorate of General Security (GS) is the Lebanese intelligence service\n\nGeneral Directorate of Sate Security is the Lebanese executive intelligence service'],
      ]
    }
  }
  render() {
    const state = this.state;
    const {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    } = Dimensions.get('window');
    const scale = SCREEN_WIDTH / 320;
    
    function normalize(size) {
      const newSize = size * scale 
      if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
      } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
      }
    }
    return (
      <View style={styles.container}>
         <Text style={{fontSize:normalize(12),color:"black",textAlign:"center",alignSelf:"center"}}>Lebanon Facts and Figures</Text>
         <View  style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",marginTop:"2.5%" ,alignSelf:"center" }}
      />
        <Text style={{fontSize:normalize(12),color:"black"}}>{"\n"}Nature:{"\n"}</Text>
        <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
           <Rows data={state.DataTable} textStyle={[styles.TableText, {fontSize:normalize(12)}]}  />
        </Table>
<Text>{"\n"}{"\n"}</Text>

        <Text style={{fontSize:normalize(12),color:"black"}}>People:{"\n"}</Text>
        <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
           <Rows data={state.DataTable2} textStyle={[styles.TableText, {fontSize:normalize(12)}]}  />
        </Table>

        <Text>{"\n"}{"\n"}</Text>
        <Text style={{fontSize:normalize(12),color:"black"}}>Politics:{"\n"}</Text>
        <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
           <Rows data={state.DataTable3} textStyle={[styles.TableText, {fontSize:normalize(12)}]}  />
        </Table>


      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: '2%',
    paddingTop: 35,
    backgroundColor: '#ffffff' 
  },
  HeadStyle: { 
    height: 50,
    alignContent: "center",
    backgroundColor: '#ffe0f0'
  },
  TableText: { 
    margin: 10,color:"black"
  }
});