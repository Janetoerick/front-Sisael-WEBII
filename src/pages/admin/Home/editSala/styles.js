import { StyleSheet } from "react-native";

const purple_navy = "#655A7C"
const glosy_grape = "#AB92BF"
const black_chocolate = "#1E2019"
const blizzard_blue = "#AEECEF"
const blue_munsell = "#1985A1"
const edit = "#FBB13C"
const remove = "#D81E5B"

const styles = StyleSheet.create({
    page:{
        flex:1,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
    },
    container:{
        width:"90%",
        alignItems:"center",
    },
    input: {
        width:"95%",
        borderWidth:1,
        borderRadius:10,
        borderColor:"gray",
        height:47,
        justifyContent:"center",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:22,
        paddingRight:22,
        marginTop:15,
    },
    inputView:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-around",
    },
    infoInput:{
        width:"30%",
        color:"white",
        borderRightWidth:1,
        borderColor:"gray",
        textAlign:"center",
        paddingRight:20,
    },
    valueInput:{
        width:"60%",
        textAlign:"center",
    },
    valueInputUpdate:{
        width:"40%",
        color:black_chocolate,
        textAlign:"center",
    },
    erroText:{
        textAlign:"center",
        color:"#FCB0B3",
    },
    button:{
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width:"90%",
        backgroundColor:blue_munsell,
        paddingTop:14,
        paddingBottom:14,
        marginLeft:12,
        marginTop:30,
    },
    buttonText:{
        color:"white",
    },
    valueInputDisable:{
        color:"gray"
    }
});

export default styles