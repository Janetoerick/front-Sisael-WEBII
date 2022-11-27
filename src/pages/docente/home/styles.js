import { StyleSheet } from "react-native";

const purple_navy = "#655A7C"
const glosy_grape = "#AB92BF"
const black_chocolate = "#1E2019"
const blizzard_blue = "#AEECEF"
const blue_munsell = "#1985A1"

const styles = StyleSheet.create({
    page:{
        flex:1,
        width:"100%",
        justifyContent:"flex-start",
    },
    top:{
        paddingTop:10,
        alignItems:"center",
        textAlign:"center",
        backgroundColor:blue_munsell,
        width:"100%",
        height:100,
    },
    labelTop:{
        paddingTop:25,
        fontSize:26,
        color:"#fff",
    },
    body:{
        borderTopEndRadius:25,
    },
    barOptions:{
        backgroundColor:blue_munsell,
    },
    moduloReservas:{
        height:150,
        width:"100%",
        alignItems:"center",
        paddingTop:15,
    },
    textModulo:{
        textAlign:"center",
        paddingTop:5,
        paddingLeft:20,
        paddingRight:20,
    },
    labelAgendar:{
        fontSize:18,
        fontWeight:"bold",
        color:"#655A7C",
    },
    button:{
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width:"90%",
        backgroundColor:blue_munsell,
        paddingTop:14,
        paddingBottom:14,
        marginTop:30,
    },
    buttonText:{
        color:"white",
        fontSize:20,
    },
    moduloVisualizar:{
        flex:1,
        flexDirection:"row",
        height:150,
        width:"100%",
        alignItems:"center",
        paddingTop:90,
    },
    textVisualizar:{
        width:280,
        height:40,
        alignItems:"center",
    },
    viewButtonVisualizar:{
        width:100,
        paddingTop:60,
        height:200,
        alignItems:"center",
        textAlign:"center",
    },
    viewReservasGrupal:{
        paddingTop:30,
        alignItems:"center",
        backgroundColor:blizzard_blue,
        borderTopStartRadius:20,
        borderTopEndRadius:20,
        borderLeftWidth:15,
        borderRightWidth:15,
        borderColor:blizzard_blue,
    },
    labelReservaGrupal:{
        fontSize:18,
        fontWeight:"bold",
        color:"#655A7C",
        paddingBottom:10,
        borderBottomWidth:0.5,
    },
    moduloReservasGrupal:{
        paddingTop:50,
        height:380,
        minHeight:200,
        alignItems:"center",
    },
    listReservasGrupal:{
        paddingTop:15,
        width:"80%",
    },
    textReservaGrupal:{
        fontSize:12
    },
});

export default styles