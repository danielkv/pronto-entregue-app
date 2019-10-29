import {StyleSheet} from 'react-native';

const styleSettings = {
	placeholderTextColor : '#79A47B',
	errorColor: '#FF4E4E'
}

const styles = StyleSheet.create({
	textInput : {
		borderBottomColor:'#fff',
		borderBottomWidth:2,
		paddingHorizontal:12,
		paddingVertical:5,
		width:'100%',
		marginVertical: 7,

		color:'#fff',
		fontFamily:'Roboto',
		fontSize:16,
		
	},
	textArea : {
		borderRadius:6,
		fontWeight:'100',
		color:'#333',
		fontFamily:'Roboto',
		textAlignVertical:'top',
		paddingHorizontal:12,
		width:'100%',
		paddingVertical:5,
		fontSize:16,
		backgroundColor:'#fff',
		minHeight:150,
	},
	picker : {
		paddingHorizontal:8,
		height:38,
		marginVertical:0,
		color:'#fff',

		fontFamily:'Roboto',
		fontSize:16,
	},
	button : {
		color:'#FF9100',
		width : '100%'
	},
	font : {
		fontFamily:'Roboto'
	},
	errorMessage : {
		color : styleSettings.errorColor,
		fontFamily:'Roboto',
		fontSize:12,
		fontWeight:'100'
	}
});

export default styles;

export {
	styleSettings
}