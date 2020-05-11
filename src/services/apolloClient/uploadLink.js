import { createUploadLink } from 'apollo-upload-client';

const host = process.env.NODE_ENV === 'production' ? 'https://api.prontoentregue.com.br/graphql' : 'http://10.1.1.170:4000/graphql';

export default createUploadLink({ uri: host });