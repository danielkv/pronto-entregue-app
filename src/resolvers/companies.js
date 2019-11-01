import gql from "graphql-tag";
import { SELECT_BRANCH } from "../graphql/branches";

export default {
	CompanyMeta:{
		action : ()=> {
			return 'editable';
		}
	},
	Mutation : {
	}
}