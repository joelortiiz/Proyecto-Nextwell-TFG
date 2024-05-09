import styled from "styled-components";

const Contenedor = styled.div`
    background-color: #fff;
    width: 100%;
    max-width: 70rem;
    height: 90vh;
    max-height: 50rem;
    overflow-y: auto;
    box-shadow 0px 1.25 rem 2.5rem rgba(0, 0, 0, 0.1);
    border-radius: 0.625rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 100;

    @media(max-width: 60rem){
        height: 100vh;
        max-height: none;
    }
    `;

    export default Contenedor;