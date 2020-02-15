import { TextFieldType } from './TextFieldTypes';

export interface Theme {
	colors?: {
		primary?: string;
		secondary?: string;
		divider?: string;
		gray?: string;
		text?: string;
		error?: string;
	};
	TextField?: TextFieldType
}

export enum Color {
	primary='primary',
	secondary='secondary'
}