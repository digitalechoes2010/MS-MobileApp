import React ,{useRef,useEffect,useState} from 'react';
import {ScrollView ,Text ,Animated ,Dimensions,StyleSheet,View,Image, Platform, PixelRatio} from 'react-native';
import {Portal} from 'react-native-paper';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen';


function Securityforces(props){
    const bottomSheetHeight =Dimensions.get("window").height *0.9;
    const deviceWidth = Dimensions.get("window").width;
    const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
    const [open,setOpen] = useState(false);
    const onGesture = (event) =>{
    if(event.nativeEvent.translationY > 0){
    bottom.setValue(-event.nativeEvent.translationY)
    }
    }
    
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
    
    const onGestureEnd = (event) =>{
        if(event.nativeEvent.translationY > bottomSheetHeight /2 ){
            setOpen(false);
            }
            else{
                bottom.setValue(0);
            }
    }
    
    
    useEffect( () =>{
    if(open){
        setOpen(open);
        Animated.timing(bottom ,{
            toValue:0,
            duration: 500,
            useNativeDriver:false
        }).start();
      
    
    }
    else{
        Animated.timing(bottom ,{
            toValue:-bottomSheetHeight,
            duration: 500,
            useNativeDriver:false
        }).start( () =>{
            setOpen(false);
        });
        
      
    
    
    }
    
    }, [open]);
    
    return(
        <>
  



       <ScrollView>
           <View style={styles.messageceocontainer}>
               <Text style={{fontSize:normalize(12),color:"black"}}>The Security Forces</Text>
   
<View  style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",marginTop:"2.5%"  }}
      />
      
      <Text style={{color:"black",textAlign:"left",fontSize:normalize(12)}}>
{"\n"}
The Lebanese Armed Forces
</Text>

<Text style={{color:"black",textAlign:"left",fontSize:normalize(12)}}>
{"\n"}
History
</Text>
            
<Text style={{color:"black",textAlign:"justify", fontSize:normalize(12)}}> {"\n"}

The Lebanese Armed Forces (LAF) was established as the official armed forces of the independent republic of Lebanon on August ist 1945 when the French military handed over command of all the units formed by the mandate authorities during 1916-1943. The first LAF Commander was the famous Fouad Chehab, leading the unification process. He set an important standard during his 13-year in office - the army's non-interference in quarrels between political groups, even when they turn violent. Chehab ordered the army to protect public institutions not its politicians during the 1952 riots that unseated President Beshara al-Khouri and in the 1958 conflict that forced President Camille Chamoun from office. His professional and selfless leadership of the army propelled him into the presidency in 1958 after Chamoun left office which set a precedent that would become the norm in the post-civil war era of the LAF Commander transferring from the highest military position to the highest political office. After the onset of the civil war in 1975, the Lebanese Armed Forces splintered along sectarian lines as most individual soldiers and officers turned to their own sect, its political bosses and militia leaders. In 1984 Michel Aoun was appointed commander of the rump Lebanese army. Five years later, as prime minister of a controversial military cabinet, he led an armed campaign against the rival Lebanese government led by Prime Minister Salim al-Hoss and the Syrian forces in Lebanon. In 1989 Emile Lahoud was appointed new LAF commander and the following year Aoun fled into exile after launching a wholly unsuccessfully 'war of liberation' against the Syrian authorities in Lebanon. Under Lahoud's stewardship, considerable progress was made in repairing the damage done to LAF's material, organizational and social fabric. After Lahoud was elected president in 1998, his successor Michel Suleiman continued the process of returning LAF to its former glory. However, Lahoud and Suleiman's efforts were restrained by the Lebanese political class' failure to allocate sufficient funding, ensure promotions were strictly meritocratic, and develop a national defence strategy. Apart from the successive Israeli aggressions on Lebanon, LAF's first major battle in the post-civil war era was the 2007 war for the Nahr al-Bared Palestinian refugee camp in northern Lebanon taken over by infamous salafi-jihadist group Fatah al-Islam. After members of the group ambushed an LAF unit in May 2007, the army could no longer stand by and moved to dislodge the islamist militia from the camp. A deadly and highly destructive four-month battle ensued, in which several lingering gaps in the reconstitution of LAF became apparent. For example, LAF reportedly ran out of artillery shells, nearly exhausted its machine gun ammunition and had to resort to dropping naval mines and improvised bombs from transport helicopters due to the lack of aerial capability. Less than a year after the Nahr al-Bared battle, LAF found itself facing another crisis. In May 2008 political tensions between the March 8th and March 14th blocs escalated into armed clashes in Beirut, when militias loyal to the former took over control of the entire western half of the capital. Following in the footsteps of Fouad Chehab to prevent the army from splintering along political and sectarian lines, LAF Commander Michel Suleiman ordered his troops to stand down and avoid taking part in the clashes while protecting critical public institutions. When Suleiman was elected president later that month he was replaced by his protege Jean Kahwagi. Under Kahwagi LAF intensified its engagement with regional and western donors wanting to capacity-build the Lebanese army. The arab and western states supporting LAF had important political motivations for doing. so. Their aim was to capacity build LAF into a counter-weight to the influence of Hezbollah and the Syrian government, the principal regional rivals of the west and the Gulf monarchies. However, until the present day the goal of empowering the Lebanese army to become the sole, capable defender of Lebanon against all foreign aggression has been undermined by western policies toward Israel, the principal threat to Lebanon. Western states led by the US have repeatedly opposed transferring advanced weapons to LAF while at the same time generously donating billions of USD dollars in military aid to Israel annually in the form of the most advanced arms systems in the world. The result of these policies is that Israel's qualitative military edge vis-a-vis the Lebanese Armed Forces is widening every year, undermining the stated objective of empowering LAF to the point where it can be the sole, capable defender of Lebanon's people and territory. Western support for LAF did however accelerate after the onset of the Syrian conflict in 2011 as the spill-over into Lebanon inflamed political and sectarian tensions, with the country teetering on the brink of civil war in 2013. With western support, LAF formed its first-ever land border regiments in a bid to control the notoriously porous frontier between Lebanon and Syria. It was being freely used by Lebanese and Syrian militiamen participating in the war next door, as well as by terrorist operatives seeking to join the jihad in Syria or expand it to Lebanon. In the summer of 2013 LAF battled an islamist militia loyal to salafi-jihadist cleric Ahmad al-Assir in Saida, in August 2014 LAF and other security forces fought a deadly battle with terrorists invading the border town of Arsal and taking three dozen Lebanese servicemen hostage, while two months later LAF battled Lebanese jihadists loyal to Syrian Al-Qaeda branch Jabhat al-Nusra in the northern city of Tripoli. In all three cases, LAF displayed notable improvements compared to the battle for Nahr al-Bared in 2007 despite some gaps. LAF's performance was all the more impressive given the extremely difficult political climate in Lebanon. Lebanon had a weakened care-taker cabinet from early 2013 to early 2014, after which a national unity government took office only to be paralysed and inahle to appoint replacements for senior military officers reaching their retirement age. Consequently, several seats in the LAF Military Council became vacant while General Kahwagi and other officers had their term's extended beyond mandatory retirement age. The obstruction in the natural flow of retirements and promotions created imbalance in the upper echelons of the LAF. A breakthrough was achieved when Michel Aoun was elected president in October 2016 (the third time in a row that a former army commander became president) and subsequently appointed Saad Hariri as head of a new cabinet. In March the following year a grand political deal was made to fill all vacant seats in the top of LAF and appoint replacements to those have exceeded mandatory retirement. This included LAF Commander Jean Kahwagi who had been an official candidate for the presidency and was replaced by General Joseph Aoun. In August a political greenlight was given for LAF to liberate the north-eastern border region occupied by terrorists from Islamic State and Jabhat al-Nusra. In arguably its biggest test since the 2006,. LAF delivered a remarkable performance by expelling the jihadist from Lebanese lands in less than two weeks while suffering less than a dozen casualties. {"\n"}{"\n"}
Mission {"\n"}
According to the National Defence Law of 1983, the Lebanese Armed Forces has three official missions. The first its defending Lebanon's borders and territory from external aggression, especially from Israel. No other foreign actors are explicitly mentioned in this mission. The second mission is the maintenance of internal security in Lebanon, including combating spy, terrorist and organised crime networks. This mission is de facto expanded to also contain armed groups like the clans from the Bekaa Valley or militias of political or religious leaders. The prioritisation of this mission is evidenced in the conspicuous LAP presence around Lebanon at bases inside cities, on highway checkpoints and during patrols in various areas. The third mission is to rehabilitate national infrastructure and alleviate civil suffering via development and humanitarian projects. {"\n"}{"\n"}
Structure {"\n"}
In contrast to the armed forces of western state, the Lebanese Armed Forces have one integrated command for all its branches. the army, the navy, the air force, and the special forces. In addition to the LAF High Command in the Ministry of Defence in Yarzeh it has five regional commands overseeing the different parts of Lebanon. The Lebanese army consists of ii motorised infantry brigades, six intervention regiments, three land border regiments, three special forces regiments (the Airborne, the Rangers, and the Marine Commandos), two field artillery regiments, and one presidential guard, engineering, signals, anti-armour, logistics, and support regiments. The LAF top brass is divided into confessional quotas among the six largest sects: a maronite is the commander, a druze is the chief of staff, a shiite is General-Director of management, a christian orthodox is inspector-general, a sunni is the secretary-general of the Higher Defence Council, while a christian catholic is LAF general officer. Together, these six generals constitute the Military Council of the Lebanese Armed Forces. The preeminent political parties from each sect have a decisive say bordering de facto veto over the figure occupying the position reserved for their sect. 
External support LAF's external supporters have historically reflected the foreign policies of the government. Prior to the civil war, former president Camille Chamoun had positioned Lebanon with the pro-western bloc in both the regional opposition to pan-arabism and in the international cold war between the US and the Soviet Union. The civil war and the Syrian intervention greatly expanded Damascus' influence in Beirut, a role that was internationally approved with the Taef Accord and the subsequent bilateral treaties concluded by the Syrian government and its allied Lebanese counterpart. Western and Gulf support was minimal due to the shaky relations with the Syrian government while Russia was too busy handling the aftermath of the collapse of the Soviet Union to play any role. The Syrian withdrawal from Lebanon in 2005 was seen as an opportune moment by the US, the UK, France and the Gulf monarchies to jump in as the primary supporters of LAF as part of a wider effort to bring Lebanon out of the Syrian orbit and on a path aligned with their own geostrategic interests. Since 2006, the US has provided more than 2 billion USD in material support for LAF while. the UK, France, Italy, Germany, Denmark and other European states each have offered double-digit million dollar amounts as well. The external material support has been absolutely essentially in equipping LAF since the Lebanese government's financial policies has made it unable to afford more than covering military salaries and pensions which have been inflated to unsustainable levels to expand politicians' ability to extend patronage to loyalists. The western support has generally been limited to low-tech hardware like armoured vehicles, artillery units, small arms, ammunition and communications equipment. Advanced systems like radars, air-defence systems, modern battle tanks, sophisticated anti-tank missiles and combat aircraft have been conspicuously absent from the international support for LAF. This reflects the international community's concerns that foreign-supplied arms to LAF would fall into the hands of Hezbollah and its perspective that it does not share the Lebanese view of Israel being the primary threat. Hezbollah's consolidated role in the Lebanese government continues to make international donors reluctant, manifested in Saudi Arabia's decision to freeze a 3 billion USD grant for LAF. Nonetheless, the US has widened its material support for LAF by delivering six Super Tucano light attack aircraft and planning to supply attack drones as well to help it combating terrorist groups. Due to the political limitations being put on international material assistance from the west and the Gulf monarchies, some Lebanese politicians have in later years explored soliciting support from alternative patrons, most notably Russia and Iran Both have repeatedly expressed their readiness to support LAF, with Russia even offering a free donation of rifles and ammunition. However, for geopolitical reasons the US and Saudi Arabia have adamantly refused to allow Russia and Iran to have any role in LAF, successfully pressuring the Lebanese government to shelve a bilateral military agreement with Moscow, transferring the free Russian donation to the ISF instead and rejecting all Iranian offers. Thus, the US and its European allies remain the principal external supporters of LAF, which is thus almost exclusively armed and equipped with American and European hardware. {"\n"}{"\n"}
The Internal Security Force {"\n"}
History The precursor to the Internal Security Force (ISF) was created in 1861 with the formation of the gendarmerie the year after the establishment of the 'mutassariya' administration in Ottoman-occupied Lebanon. The gendarmerie lacked resources, training and equipment, leaving its officers unpaid and relatively disorganized. With the onset of World War 1, the Ottoman occupiers accused the Lebanese authorities of cooperating with France, and gendarmerie officers suspected of disloyalty were purged and replaced with Ottomans, setting a precedent of politically motivated appointments lasting until the present day. Moreover, as the war continued and the economic situation deteriorated, a further slashing of gendarmerie salaries forced many officers to find illicit ways of earning money, another trend that is present today. Following the world war, the Ottoman defeat and the institution of the mandate, the French authorities began to organize, capacity-build and professionalize the new Lebanese republic. By the time Lebanon achieved independence in 1943, the gendarmerie had improved significantly and was held in relatively high regard by the Lebanese population. In 1959, President Fouad Chehab issued a decree centralizing the gendarmerie and other law-enforcement agencies officially into the newly-created ISF. Subsequent organizational additions and alterations were executed over the course of the 1960s. But the onset of civil war led to the effective collapse of the ISF as individual members joined the political leaders and militias of their specific sect. Following the end of the civil war, in 1990 a new decree was issued to form the organisational basis for a reconstituted ISF, which maintained its mission as defined upon its creation in 1959. Just like LAF, ISF was also a priority for the Syrian military and intelligence officers remaining in Lebanon after the civil war under the Taef Accord and the subsequent bilateral agreements. Damascus and its political allies in Beirut generally staffed the ISF top ranks with officers loyal to their interests. This trend was reversed completely after the 2005 Syrian withdrawal from Lebanon when the anti-Damascus coalition sought to purge the Lebanese security institutions of Syria loyalists. Being the spearhead of the anti-Syrian coalition, Lebanon's largest party and controlling the position of prime minster, the Future Movement established considerable influence over the ISF. Party loyalists with long-time ties to the Hariri family like Ashraf Rifi, Wissam al-Hassan and Imad Otman were appointed to senior positions, while the broader agency was empowered with the expansion of the Information Branch and the establishment of its own special forces regiment the Panthers. The sunni domination of the ISF has lasted till this day. {"\n"}{"\n"}
Mission {"\n"}
The primary mission of the ISF is to maintain domestic security and public order, protecting public properties, preserving freedoms within the law, implementing orders from the judiciary, running the prison system and guarding foreign embassies. With the expansion of the Information Branch and the establishment of the Panthers, ISF has however also taken a much greater role in intelligence gathering, hostage situations, counter-terrorism and counter-espionage.{"\n"}{"\n"} 
Stricture {"\n"}
Under the 1990 decree, the most important ISF departments are the Beirut police, the territorial gendarmerie, the mobile gendarmerie, the judicial police and the security detail for embassies and public administrations, followed by the Central Administration, the ISF Academy, the Social Services Department, the Inspector General's office and the administrative staff. The heads of these ten departments are represented in the ISF leadership council. Living a somewhat separate existence, ISF also covers the relatively independent Information Branch, the Cyber Crimes Division, and the Panthers special forces The total number of employees in all branches of the ISF has surged from 9,000 in 1991 to 15,000 in 1998, 30,000 in woo, 40,000 in 2013 and around 45,000 in 2019. 
While the position of ISF General-Director is reserved for a sunni muslim (typically selected by the Future Movement since zoos), its top brass is divided into sectarian quotas just like the other security agencies. Thus apart from the General-Director, IFS's ten-member leadership council includes two sunnis, two shiites, one druze, three maronites, one orthodox and one catholic. As with the other security agencies, political parties maintain a near-veto over appointments to positions reserved for their sect. When political tensions are high, as during the 2007-2017 period, the ISF leadership often goes paralysed, promotions are not made and retiring staff are not replaced. But following the election of a president and appointment of a prime minister in late 2016, in early 2017 a grand political deal revitalised the ISF leadership council by filling empty seats and appointing new figures. {"\n"}{"\n"}
External support Mirroring the dynamics in LAF, there was only limited external western support for ISF in the 199o-zoo5 period apart from training programmes held outside Lebanon. Instead, the bulk of the external assistance for ISF came from Syria which aimed to consolidate its influence in Lebanon while its international political rivals generally refrained from taking any steps that could assist that. After the Syrian withdrawal in 2005 and the wave of politicised appointments in the ISF, western support for ISF surged. The US and the UK took leading roles in capacity-building, delivering specialised training courses, supplying weapons and non-lethal hardware, forming intimate relations with senior ISF officers in the process. But although the ISF leadership is widely deemed close the Future Movement, in early 2016 Saudi Arabia froze a planned i billion USD grant to the ISF in protest against Hezbollah's influence in Lebanon. Saudi Arabia has yet to unfreeze its grant, but while they share Riyadh's political concerns, the US and the UK continue to support the ISF. In recent years much of this has focused on modernising and professionalising the agency, including via implementing community-policing practices. {"\n"}{"\n"}
The General Directorate of General Security {"\n"}
History The General Directorate of General Security, better known simply as General Security, was first established in 1921 under the name 'The First Bureau' as Lebanon's first proper intelligence agency. Two years after Lebanon achieved independence from France in 1943 a decree from the ministry of interior established General Security as a directorate under the ministry's control. After Fouad Chehab became president, two 1959 decrees upgraded the status of General Security into a full-fledged general directorate with a centralised administration, regional departments as well as frontier offices. 
Like LAF and ISF, General Security also fragmented during the civil war when the state institution collapsed and lost effectively control of all its border and entry points. And like its partner agencies it was also rebuilt in the iggos under the oversight of the Syrian authorities. But like the ISF, General Security remained in urgent need of modernisation, and after assuming the position of general director in 1998, Mal, Gen. Jamil al-Sayyid undertook a sweeping wave of steps to reform, modernise and organise General Security, successfully turning it into a highly capable intelligence agency. However, the agency was continually criticised by the anti-Syria political opposition in Lebanon of serving Damascus' interests by all means. After the Syrian withdrawal in 2005, General Security underwent the same purge as ISF and LAF of personnel deemed to have collaborated with Damascus over the previous 15 years. Most notably, Jamil al-Sayyid was arrested in August 2005 for alleged involvement in the Rafik Hariri assassination but was released four year later without ever being officially charged in a case mired in politicking. Sayyid was replaced but the agency did not receive the same boost in domestic and foreign support as LAF and the ISF despite the lingering threat of extremist groups and Israeli spy networks. 
In 2011 the Lebanese government appointed Abbas Ibrahim the new General-Director of General Security. At the same time, General Security faced arguably its greatest-ever challenge in managing the spill-over from the Syrian conflict which began the same year. Over the following years, more than 1.5 million Syrian refugees entered Lebanon, dramatically inflating the number of foreigners the agency is mandated to control and monitor. Moreover, the Syrian conflict fuelled a surge in islamist extremism in Lebanon, leading to a wave of terrorist attacks in Lebanon carried out by domestic and foreign groups. Thanks to Ibrahim's undeniable skills and his rapport with the entire political class and foreign intelligence agencies, General Security stood up to the challenge and weathered the storm in historically unprecedented partnership with the ISF and LAF, overcoming their historical inter-agency rivalries. In testimony to Ibrahim's accomplishment's, he was the only head of any of the security agencies to remain in his post during the large reshuffle carried out in early 2017 when the new government appointed new heads of LAF, its intelligence branch, the ISF, its information branch, and the State Security Directorate. In recent year's Ibrahim has hunched a wider modernisation campaign aiming to make the agency even more effective, including by digitising much of the paper work and updating the Lebanese passport system. {"\n"}{"\n"}
Mission {"\n"}
As any other domestic intelligence agency, General Security's primary mission is to gather and analyse information about political, economic, social and security issues relevant to the state's interests. In recent years, this has increasingly focused on counter-terrorism operations against islamist extremists as well as counter-espionage against foreign, especially Israeli, spy networks operating in Lebanon. Secondly, the agency is also mandated with enforcing Lebanese media censorship by surveillance of print and digital media as well as screening movies. Thirdly, General Security is responsible for all foreign nationals residing in Lebanon, whether short- or long-term, including by monitoring their entry, stay and departure. General Security is also responsible for the passports of Lebanese citizens and the travel documents of Palestinian refugees residing in Lebanon. {"\n"}{"\n"}
Structure {"\n"}
As a state intelligence agency dealing with matters of national security, General Security's internal organisational structure, its number of employees and budget are confidential. It has eight branch offices in the Bekaa Valley, 12 in southern Lebanon, 13 in Mount Lebanon, 13 in north Lebanon, and one in Beirut. In addition, it has 12 headquarters on Lebanon's land borders, sea ports and only international airport. It also has a special force-like tactical team for use against major threats to Lebanon's security like terrorist cells or foreign spy networks. 
External support As a state intelligence agency dealing with matters of national security, General Security's external partners and supporters remain generally confidential. News reports and statements by various public officials indicate that the agency retains extensive contacts with its counter-parts in other countries across the region as well as in the west. In 2016, General Security was included in a major EU project for security sector reform aiming to further enhance the agency's abilities. It has received considerable amounts of border control equipment such as x-ray scanners, eye-identification systems and IT equipment for its positions on the official entry points into Lebanon. 
The General Directory of State Security History The General Directory of State Security, better known as simply State Security, is the youngest of the Lebanese security institutions and was only founded through a series of decrees in the first half of the 198os at the height of the civil war when other security bodies had long since fragmented. Also in contrast to the other security agencies, State Security answers to the President, the Prime Minister and the Higher Defence Council, in contrast to ISF and General Security which are tied to the ministry of interior, and LAF which is attached to the ministry of defence. Due to the chaos of the civil war and the institutional splits opening towards its end, State Security was not wholly launched until the 199os under the leadership of General-Director Nabih Farhat. While it made substantial progress towards institutional building and organisational competence, the agency never reached near the prominence, fame or importance of the three other security bodies. This mainly reflected its much more limited, narrow mandate and resource requirements, but also the fact that the head of State Security is from the christian orthodox sect, which is much less influential than its maronite, sunni and shiite peers. Just like the other security and intelligence agencies, State Security also underwent a major, politically-driven personnel turnover in 2005 in the aftermath of the Syrian withdrawal and the landslide electoral victory for the March 14th block. General-Director Edward Mansour resigned in May and replaced by Hassan Fawwaz. However, instead of heralding continuity, entrenched bureaucratic infighting among senior agency staff amplified by their political patrons led to a prolonged crisis in leadership. Fawwaz himself left the agency just five months later, leaving the seat to Elias Kankati who stayed in office for five years, while his successor Mustafa Dakroub held office for less than three months. Fawwaz, Kankati and Dakroub had officially served as 'acting general-directors' rather than official heads of the agency. When Dakroub's successor George Karaa was appointed in May 2010, it was the first time in half a decade the agency had a full-fledged general director and the six officers to head the agency in around five years. While Karaa held on to his post for eight years, the debilitating bureaucratic politics continued as the agency was left incapacitated to a considerable extent due to his persistent clashes with his deputy Muhammed al-Tufaili. Karaa's efforts to solicit political support and consolidate his authority by raising the banner of defending christian influence prompted a fierce backlash in the form of funding cuts and complete marginalisation of the agency within the security sector. 
New life and long-needed organisational efficiency was finally breathed into State Security in March 2017 when a wider reshuffling of senior positions in the security agencies led to the appointed of a new General Director, Tony Saliba, and a new deputy, Samir Sanan. The appointments and their unequivocal political backing from president Aoun have ended the debilitating bureaucratic infighting and set the agency on track to carry out its duties with previously unseen levels or organisational effectiveness and professionalism. {"\n"}{"\n"}
Mission {"\n"}
The agency is formally the security body of the executive branch of government, meaning its primary function is to protect critical state officials and institutions. Besides providing physical security it also gathers and analyses intelligence about threats to them and government interests more broadly. This includes counter-terrorism and counter-espionage efforts, which have intensified dramatically since the paralysing bureaucratic chaos was put to an end with the March 2017 appointments. {"\n"}{"\n"}
Structure {"\n"}
As the intelligence and security agency of the executive branch, State Security's number of employees and budgets are confidential. It's organisational structure includes the office of the general-director, the security division, the internal security division, the external security division, the public sector organisations security division, the protection and response division, the intelligence gathering division, the planning division and eight regional branches across Lebanon. 
External support As the intelligence and security agency of the executive branch, State external partners and supporters generally remain classified. Moreover, since its areas of operations are more confidential than the ISF and much of General Security's work, State Security is far less often represented in official reports and rarely detailed in statements about its operations or external ties. But in general it has received far less official support from the foreign states than LAF, ISF or General Security. {"\n"}{"\n"}
Lebanese Customs 
Mission {"\n"}
Lebanese Customs Department is- the national governmental authority responsible for collecting customs duties and controlling the flow of goods in and out of the country. The Customs Department is under the control of the Ministry of Finance. In its daily operations it is under the authority of the High Council of Customs, the Director General of Customs and the Regional Directors. In practice the department cooperates and coordinates with General Security, which is responsible for watching the movement of people in and out of Lebanon.. The Customs Department is responsible for ensuring that all movement of goods and persons in and out of Lebanon is in accordance with relevant regulations. This specifically involves claiming customs duties, taxes and the VAT, making collections a major share of state revenue, as well as inspecting persons, baggage, cargo and mail crossing Lebanese borders. Another key task is enforcing restrictions on imports and exports, including detecting and reporting smuggling and other illegal cross border activity. Finally, customs also provides trade statistics for the trade community and the wider public. {"\n"}{"\n"}
Structure {"\n"}
To carry out its tasks, Lebanese Customs officers are stationed at all of the country's points of entry which in addition to Rafic Hariri International Airport includes the five land crossings with Syria and the seaports of Beirut, Tripoli, Sidon, Tyre, and Jounieh. At these entry points Lebanese Customs officers coordinate and cooperate with General Security officers to enforce border control. Additionally, in order to carry out inspections of vessels at sea, the Lebanese Customs Department operates a small naval fleet consisting of two British made Tracker class patrol boats as well as four Canadian made Zodiac Hurricane ino AFT 10 Commando rigid hulled inflatable boats. As for software easing its daily operations, the Customs Department remote filing of manifests and declarations was introduced in zoli to facilitate trade, transparency, and security. Transit trade applications can also be now filled online. The Customs Department has also established an Intelligence Unit to detect counterfeiting and fraudulent operations. </Text>
           </View>

</ScrollView>
  
 <Portal>
   
<Animated.View style={[styles.root ,{  bottom : bottom , height : bottomSheetHeight,
shadowOffset:{
    height:-3 
}
},styles.common ]}>

<PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>


<View style={[styles.header,styles.common , { shadowOffset :{ height:3 }}]}>
<View style={{width:60 , position :"absolute" , top: 8 , left: (deviceWidth - 60)/2 ,
zIndex:10 ,height:3 ,borderRadius :1.5 ,backgroundColor: "#ccc"


}} />

</View>
</PanGestureHandler>


</Animated.View>

 </Portal>


        </>


    )};

     
      
      export default Securityforces;

const styles = StyleSheet.create({
    root:{
        position:"absolute",
        left:0,
        right:0,
        zIndex:100,
        backgroundColor:"#fff",
        borderTopLeftRadius : 8,
        borderTopRightRadius : 8,
        shadowColor :"#000",
        shadowOffset :{
            height:-3,
            width:0
        },
        shadowOpacity : 0.24,
        shadowRadius : 4,
      
       
       elevation:3,
       overflow:"hidden"
  
  
    },
    header:{
        height:40,
        backgroundColor:"#fff",
  
  
    },
    common:{
      shadowColor :"#000",
      shadowOffset :{
        
          width:0
      },
      shadowOpacity : 0.24,
      shadowRadius : 4,
    
     elevation:3
  
    },
    closeIcon:{
         position:"absolute",
         right:8 ,
         top:0,
         zIndex:10
    },
    pfstyle:{
        flex: 1,
        width: '90%',
        height: '20%',
        resizeMode: 'contain',
        alignSelf:"center",
        borderRadius:150
    
      }
    
      ,
      pfcontainer:{
          width:wp('30%'),
          height:hp("20%"),
         
          alignSelf:"center",
          padding:hp("2%"),
          justifyContent:"center"
      },
      myinfocontainer:{
        width:wp("85%"),
       
        height:"auto",
        alignSelf:"center",
        borderRadius:15
  
    },
    titletext:{

        color:"#5D729B",
        fontSize:15,
        marginTop:'2%',
        fontWeight:"bold"
    },
    textstyle:{
        marginTop:'2%',
        fontSize:15
    },
    messageceocontainer:{
        width:'90%',
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        alignSelf:"center",
        marginTop:'10%'
    }
  })