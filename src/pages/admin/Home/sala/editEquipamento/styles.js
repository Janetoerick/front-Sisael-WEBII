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
    },
    input: {
        width:"90%",
        borderRadius:50,
        backgroundColor:"#f6f6f6",
        height:40,
        margin:12,
        backgroundColor:blizzard_blue,
    },
    inputView:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-around",
        margin:10,
    },
    infoInput:{
        width:"40%",
        color:"white",
        borderRightWidth:1,
        borderColor:"gray",
        textAlign:"center",
        paddingRight:20,
    },
    valueInput:{
        width:"40%",
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
});

export default styles