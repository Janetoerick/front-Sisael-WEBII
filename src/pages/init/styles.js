import { StyleSheet } from "react-native";

const purple_navy = "#655A7C"
const glosy_grape = "#AB92BF"
const black_chocolate = "#1E2019"
const blizzard_blue = "#AEECEF"
const blue_munsell = "#1985A1"

const styles = StyleSheet.create({
    formContext:{
        flex:1,
        backgroundColor:"#FFFFFF",
        alignItems:"center",
        width:"100%",
        height:"100%",
        paddingTop:60,
    },
    form:{
        width:"100%",
        height:"auto",
        alignItems:"center",
    },
    labelForm:{
        color:blue_munsell,
        fontSize:26,
        textAlign:"center",
        fontWeight:"bold",
        marginTop:120,
        marginBottom:60,
    },
    input: {
        width:"90%",
        borderRadius:50,
        backgroundColor:"#f6f6f6",
        height:40,
        margin:12,
        paddingLeft:10,
    },
    buttonEntrar:{
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
    viewCadastro:{
        flex:1,
        width:"100%",
        height:"auto",
        justifyContent:"flex-end",
    },
    textCadastro:{
        textAlign:"center",
        paddingBottom:10,
        paddingTop:10,
        backgroundColor:"#FBFBFB"
    },
    linkCadastro:{
        color:blue_munsell,
    },
    textErro:{
        color:"#FCB0B3",
        fontSize:16,
        textAlign:"center"
    },
    formContextCadastro:{
        flex:1,
        backgroundColor:"#FFFFFF",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
    },
    formCadastro:{
        height:"auto",
        width:"100%",
        alignItems:"center",
    },
});

export default styles