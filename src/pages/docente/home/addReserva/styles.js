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
        backgroundColor:"#dcdcdc"
    },
    container:{
        width:"90%",
        justifyContent:"center",
        alignItems:"center"
    },
    button: {
        width:"20%",
        borderRadius:50,
        backgroundColor:"#f6f6f6",
        height:70,
        margin:12,
        backgroundColor:blue_munsell,
        justifyContent:"center",
        alignItems:"center",
        marginTop:200
    },
    textErro:{
        color:remove,
    },
    buttonBack: {
        width:"20%",
        borderRadius:50,
        backgroundColor:"#f6f6f6",
        height:70,
        margin:12,
        backgroundColor:remove,
        justifyContent:"center",
        alignItems:"center",
        marginTop:200
    },
    viewButtons:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        width:"100%",
        alignItems:"center"
    },
    input:{
        borderWidth:1,
        borderRadius:10,
        borderColor:"gray",
        width:"80%",
        height:47,
        justifyContent:"center",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:25,
        paddingRight:25,
        marginTop:15,
    },
});

export default styles