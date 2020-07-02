const serverConfig = {};

/* serverConfig.host = 'https://api.prontoentregue.com.br/graphql';
serverConfig.webSocket = 'wss://api.prontoentregue.com.br/graphql'; */

if (process.env.NODE_ENV === 'production') {
	serverConfig.host = 'https://api.prontoentregue.com.br/graphql';
	serverConfig.webSocket = 'wss://api.prontoentregue.com.br/graphql';

} else {
	serverConfig.host = 'http://10.1.1.170:4000/graphql';
	serverConfig.webSocket = 'ws://10.1.1.170:4000/graphql';

	/* serverConfig.host = 'https://api.prontoentregue.com.br/graphql';
	serverConfig.webSocket = 'wss://api.prontoentregue.com.br/graphql'; */

	/* serverConfig.host = 'http://ec2-18-228-38-55.sa-east-1.compute.amazonaws.com:4000/graphql';
	serverConfig.webSocket = 'ws://ec2-18-228-38-55.sa-east-1.compute.amazonaws.com:4000/graphql'; */
}

export default serverConfig;