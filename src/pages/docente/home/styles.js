import { StyleSheet } from "react-native";

const purple_navy = "#655A7C"
const glosy_grape = "#AB92BF"
const black_chocolate = "#1E2019"
const blizzard_blue = "#AEECEF"
const blue_munsell = "#1985A1"
const edit = "#FBB13C"
const remove = "#D81E5B"

const styles = StyleSheet.create({
    page:{                                                          // ---
        flex:1,
        width:"100%",
        justifyContent:"flex-start",
    },
    top:{                                                          // ---
        paddingTop:10,
        alignItems:"center",
        textAlign:"center",
        backgroundColor:blue_munsell,
        width:"100%",
        height:100,
    },
    labelTop:{                                                          // ---
        paddingTop:25,
        fontSize:26,
        color:"#fff",
    },
    viewReservasGrupal:{                                                          // ---
        width:"100%",
        paddingTop:30,
        alignItems:"center",
        height:350,
        minHeight:200,
    },
    labelReserva:{                                                          // ---
        fontSize:18,
        fontWeight:"bold",
        color:"#655A7C",
        paddingBottom:10,
        borderBottomWidth:0.5,
    },
    moduloReservasGrupal:{                                                          // ---
        width:"100%",
        paddingTop:60,
        paddingBottom:5,
        alignItems:"center",
    },
    listReservasGrupal:{                                                          // ---
        paddingBottom:30,
        
    },
    viewListReservas:{                                                          // ---
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
    view2ListReservas:{                                                          // ---
        paddingLeft:10,
        width:"80%",
    },
    textNaoReserva:{                                                          // ---
        color:"#FCB0B3",
    },
});

export default styles