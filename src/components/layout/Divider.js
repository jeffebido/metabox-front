import styled from 'styled-components';

export default function Divider() {

    return (
        <>  
            <Container>
                <Line />
            </Container>
        </>
    );
}
const Container = styled.div`
	width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
`;
const Line = styled.div`
    width: 100%;
    height: 1px;
    background: #d7dee2;
`;