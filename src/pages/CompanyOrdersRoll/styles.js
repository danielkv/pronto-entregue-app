import styled from "styled-components/native";

export const CompanyMenuItem = styled.TouchableOpacity`
	padding: 20px 0;
	${({ selected }) => selected && 'background-color: #f0f0f0;'}
	border-radius:30px;
`