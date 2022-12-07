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
        width:"76%",
        height:47,
        justifyContent:"center",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:22,
        paddingRight:22,
        marginTop:15,
    },
    inputDescricao:{
        borderWidth:1,
        borderRadius:10,
        borderColor:"gray",
        width:"76%",
        height:120,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:22,
        paddingRight:22,
        marginTop:15,
    },
    modalPergunta:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        height:30,
    },
    notText:{
        color:blue_munsell,
    },
    viewDiscentes:{
        flexDirection:"row",
        borderWidth:1,
        borderRadius:10,
        borderColor:"gray",
        width:"70%",
        height:120,
        marginTop:15,
    },
    viewListDiscentes:{
        width:"80%",
        borderRightColor:"black",
        height:120,
        padding:10,
    },
    viewQntDiscentes:{
        width:"20%",
        height:120,
        justifyContent:"center",
        alignItems:"center",
        borderLeftWidth:0.8,
        borderTopStartRadius:10,
        borderBottomStartRadius:10,
    },
    viewDiscentesNotIn:{
        flexDirection:"row",
        borderWidth:1,
        borderBottomEndRadius:10,
        borderBottomStartRadius:10,
        borderColor:"gray",
        width:"70%",
        height:150,
        borderTopWidth:0.1
    },
    viewSearch:{
        flexDirection:"row",
        borderWidth:1,
        borderColor:"gray",
        borderTopStartRadius:10,
        borderTopEndRadius:10,
        height:50,
        paddingLeft:10,
    },
    inputSearch:{
        width:"54%"
    },
    buttonSearch:{
        backgroundColor:"gray",
        height:48,
        width:"15%",
        justifyContent:"center",
        alignItems:"center",
        paddingBottom:1,
        borderTopEndRadius:10,
    }
});

export default styles