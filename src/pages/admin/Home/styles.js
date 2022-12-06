import { StyleSheet } from "react-native";

const purple_navy = "#655A7C"
const glosy_grape = "#AB92BF"
const black_chocolate = "#1E2019"
const blizzard_blue = "#AEECEF"
const blue_munsell = "#1985A1"
const edit = "#FBB13C"
const remove = "#D81E5B"

const styles = StyleSheet.create({
    page:{ // --------------------------------------------------------------------
        flex:1,
        width:"100%",
        justifyContent:"space-between",
    },
    top:{ // --------------------------------------------------------------------
        paddingTop:10,
        alignItems:"center",
        textAlign:"center",
        backgroundColor:blue_munsell,
        width:"100%",
        height:100,
    },
    labelTop:{ // --------------------------------------------------------------------
        paddingTop:25,
        fontSize:26,
        color:"#fff",
    },
    moduloReservas:{ // --------------------------------------------------------------------
        height:150,
        width:"100%",
        alignItems:"center",
        paddingTop:15,
    },
    button:{ // --------------------------------------------------------------------
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width:"90%",
        backgroundColor:blue_munsell,
        paddingTop:14,
        paddingBottom:14,
        marginTop:30,
    },
    buttonText:{ // --------------------------------------------------------------------
        color:"white",
        fontSize:20,
    },
    viewReservasGrupal:{ // --------------------------------------------------------------------
        width:"100%",
        paddingTop:30,
        alignItems:"center",
        height:500,
        minHeight:200,
    },
    labelReserva:{ // --------------------------------------------------------------------
        fontSize:18,
        fontWeight:"bold",
        color:"#655A7C",
        paddingBottom:10,
        borderBottomWidth:0.5,
    },
    moduloReservasGrupal:{ // --------------------------------------------------------------------
        width:"100%",
        paddingTop:60,
        paddingBottom:5,
        alignItems:"center",
    },
    listReservasGrupal:{ // --------------------------------------------------------------------
        width:"80%",
        paddingBottom:30,
        
    },
    viewListReservas:{ // --------------------------------------------------------------------
        flex:1,
        flexDirection:"row",
        width:350,
        height:60,
        backgroundColor:blizzard_blue,
        alignItems:"center",
        textAlign:"center",
        borderRadius:10,
        marginTop:15,
    },
    view2ListReservas:{
        paddingLeft:10,
        width:"100%",
    },
    textNaoReserva:{// --------------------------------------------------------------------
        color:"#FCB0B3",
    },
    viewReservaTotal:{ // ====================================================================================
        flex:1,
        flexDirection:"row",
        width:"100%",
        height:60,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,
        backgroundColor:blizzard_blue,
        marginBottom:20,
    },
    viewInfoReserva:{
        paddingLeft:10,
        width:"60%",
    },
    viewButtonsReserva:{
        flex:1,
        flexDirection:"row",
        width:"30%",
    },
    buttonEditReserva:{
        alignItems: "center",
        justifyContent: "center",
        width:"50%",
        backgroundColor:edit,
        height:60,
    },
    buttonRemoveReserva:{
        alignItems: "center",
        justifyContent: "center",
        width:"50%",
        backgroundColor:remove,
        height:60,
        borderTopEndRadius:10,
        borderBottomEndRadius:10,
    },
    safeAreaModal:{ 
        backgroundColor: "#000000aa",
        flex: 1
    },
    viewModal:{
        backgroundColor: "#ffffff",
        marginRight:30,
        marginLeft:30,
        marginTop:160,
        marginBottom:160,
        padding: 40, 
        borderRadius: 10, 
    },
    viewModalDelete:{ 
        backgroundColor: "#ffffff",
        marginRight:30,
        marginLeft:30,
        marginTop:300,
        marginBottom:160,
        padding: 40, 
        borderRadius: 10, 
    },
    viewButtonDelete:{
        paddingTop:30,
    },
    buttonModalDelete:{
        width:"100%",
        height:50,
        borderRadius:50,
        backgroundColor:remove,
        alignItems:"center",
        padding:15,
    },
    buttonModalDeleteFechar:{ 
        width:"100%",
        height:50,
        borderRadius:50,
        backgroundColor:blue_munsell,
        alignItems:"center",
        padding:15,
        marginTop:10,
    },
});

export default styles