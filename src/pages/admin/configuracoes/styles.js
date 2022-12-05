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
        justifyContent:"flex-start",
        alignItems:"center",
        padding:10,
    },
    pageEdit:{
        flex:1,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        padding:10,
    },
    modulo:{
        width:"100%",
        alignItems:"center",
    },
    moduloPerfil:{
        alignItems: "center",
        justifyContent:"center",
        width:"100%",
        marginBottom:50,
        paddingTop:100,
    },
    moduloEditSenha:{
        alignItems: "center",
        justifyContent:"center",
        width:"100%",
    },
    textLogin:{
        fontSize:20,
        paddingTop:10,
    },
    moduloButtons:{
        width:"100%",
        alignItems: "center",
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
    },
    input:{
        borderRadius: 50,
        borderWidth:1,
        alignItems: "center",
        justifyContent: "center",
        width:"90%",
        backgroundColor:"#f6f6f6",
        height:40,
        margin:12,
        paddingLeft:10,
    },
    textErro:{
        color:remove,
    }
});

export default styles