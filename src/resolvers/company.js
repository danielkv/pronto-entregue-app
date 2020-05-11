import { AsyncStorage } from "react-native";

import { cloneDeep } from 'lodash';

import { sanitizeAddress } from "../controller/address";
import { extractFirstError } from "../utils/errors";

export default {
	Mutation: {
		async setSelectedCompany (_, { companyId }, { cache }) {
			cache.writeData({ data: { selectedCompany: companyId } });
		}
	}
}