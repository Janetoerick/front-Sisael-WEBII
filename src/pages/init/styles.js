import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    formContext:{
        flex:1,
        backgroundColor:"#FFFFFF",
        alignItems:"center",
        height:"100%",
        paddingTop:60,
    },
    form:{
        width:"100%",
        height:"auto",
    },
    labelForm:{
        color:"#2BD9FE",
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
        backgroundColor:"#2BD9FE",
        paddingTop:14,
        paddingBottom:14,
        marginLeft:12,
        marginTop:30,
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
        backgroundColor:"#2BD9FE"
    },
    linkCadastro:{
        color:"#88D18A"
    },
    textErro:{
        color:"#FCB0B3",
        fontSize:16,
        textAlign:"center"
    },
    formContextCadastro:{
        flex:1,
        backgroundColor:"#FFFFFF",
        alignItems:"center",
        height:"100%",
        paddingTop:60,
    }
});

export default styles