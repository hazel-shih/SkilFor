import styled from "styled-components";

const RowContainer = styled.div`
  display: flex;
`;
const RadiosContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const RadioContainer = styled(RowContainer)`
  align-items: center;
  margin-bottom: 5px;
`;
const RadioInput = styled.input`
  width: 20px;
  height: 15px;
`;
const RadioLabel = styled.label`
  color: ${(props) => props.theme.colors.grey_dark};
  margin-left: 5px;
`;

const PublishedRadiosContainer = ({ handleRadioChange, published }) => {
  return (
    <RadiosContainer>
      <RadioContainer>
        <RadioInput
          onChange={handleRadioChange}
          name="published"
          type="radio"
          id="true"
          checked={published}
          value={true}
        />
        <RadioLabel htmlFor="true">一切都 OK！發布至前台</RadioLabel>
      </RadioContainer>
      <RadioContainer>
        <RadioInput
          onChange={handleRadioChange}
          name="published"
          type="radio"
          id="false"
          checked={!published}
          value={false}
        />
        <RadioLabel htmlFor="false">還有資訊需要編輯，暫時不發布</RadioLabel>
      </RadioContainer>
    </RadiosContainer>
  );
};

export default PublishedRadiosContainer;
