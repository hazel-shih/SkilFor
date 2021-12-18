import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../constants/breakpoints";

const Wrapper = styled.div`
  background: linear-gradient(
    to right,
    ${(props) => props.theme.colors.orange},
    white 20%
  );
  margin: 0 auto;
  display: flex;
  justify-content: center;
  height: 100%;
  ${MEDIA_QUERY_SM} {
    max-width: 768px;
    background: linear-gradient(
      to right,
      ${(props) => props.theme.colors.orange},
      white 10%
    );
  }
`;

const Container = styled.div`
  padding: 125px 100px 160px 100px;
  width: 700px;
  height: 100%;
  min-height: 1000px;
  ${MEDIA_QUERY_SM} {
    max-width: 500px;
    padding: 125px 50px 160px 50px;
  }
`;

const Title = styled.h1`
  padding: 20px 0px;
  font-size: 1.5rem;
  text-align: center;
  color: ${(props) => props.theme.colors.grey_dark};
  ${MEDIA_QUERY_SM} {
    font-size: 1.3rem;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  min-height: 275px;
  border: 1px solid ${(props) => props.theme.colors.grey_light};
  border-radius: 10px;
  padding: 15px 40px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  ${MEDIA_QUERY_SM} {
    padding: 10px;
  }
`;

const Btn = styled.button`
  border-radius: 40px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.green_dark};
  color: white;
  font-weight: bold;
  padding: 20px;
  margin: 10px 0px 0px;
  min-width: 150px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  font-size: 1.3rem;
  :hover {
    opacity: 0.7;
  }

  ${MEDIA_QUERY_SM} {
    padding: 10px;
    min-width: 80px;
    font-size: 1rem;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-weight: bold;
  font-size: 1.4rem;
  ${MEDIA_QUERY_SM} {
    font-size: 1rem;
  }
`;

export { Wrapper, Container, Title, FormContainer, Btn, ErrorMessage };
