import Toast from 'react-native-tiny-toast';

// import { Container } from './styles';

function show(message, options = {}) {
	Toast.show(message, {
		position: 0,
		containerStyle: {
			borderRadius: 30,
			backgroundColor: '#F11761aa',
			paddingHorizontal: 35,

			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 5,
			},
			shadowOpacity: 0.34,
			shadowRadius: 6.27,

			elevation: 10,
		},
		...options
	});
}


export default {
	show
}