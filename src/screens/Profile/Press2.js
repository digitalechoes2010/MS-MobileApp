import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet  ,Text ,View } from 'react-native';
import {Provider} from 'react-native-paper';

import BottomSheet from './BottomSheet';

export default function ProfilePress(){
    const [show,setShow] =useState(true);

    

return(
<>
<Provider>
<View style={styles.container}>

<BottomSheet nametitle="bye" ></BottomSheet>

<BottomSheet nametitle="bye" ></BottomSheet>

</View>
</Provider>
</>
)
}

const styles= StyleSheet.create({
    container:{
    
    }
})

