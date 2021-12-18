import styled from "styled-components";
import { Link } from "react-router-dom";
import Icons from "../Icon/Icons";
import { IconDiv } from "../Icon/IconDiv";
import { MEDIA_QUERY_SM } from "../constants/breakpoints";
import Avatar from "../../components/Avatar";
import studentPic from "../../img/student.jpg";
import { AuthMenuContext } from "../../contexts";
import useMenu from "../../components/Menu/useMenu";

const Burger = styled.div`
  position: relative;
  display: inline-block;
`;
const BurgerBtn = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.theme.colors.grey_dark};
  opacity: 1;
  &:hover {
    opacity: 0.7;
  }
  margin: 8px;
  padding: 6px;
  ${MEDIA_QUERY_SM} {
    padding: 2px;
    margin: 4px;
  }
`;
const BurgerContent = styled.div`
  display: block;
  position: absolute;
  right: 0;
  background-color: ${(props) => props.theme.colors.white_pure};
  min-width: 250px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  color: white;
`;
const BurgerItem = styled(Link)`
  background-color: ${(props) => props.theme.colors.orange};
  color: ${(props) => props.theme.colors.white_pure};
  border-radius: 40px;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  margin: 12px;
  text-align: center;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
  :hover {
    opacity: 0.8;
    font-weight: bold;
  }
`;

function BurgerMenu() {
  const { menuRef, menu, setMenu, handleMenuToggle } = useMenu();
  return (
    <AuthMenuContext.Provider
      value={{ menuRef, menu, setMenu, handleMenuToggle }}
    >
      <Burger ref={menuRef}>
        <BurgerBtn onClick={handleMenuToggle}>
          <IconDiv>
            <Icons.NavIcons.Burger />
          </IconDiv>
        </BurgerBtn>
        {menu && (
          <BurgerContent>
            <Avatar imgSrc={studentPic} name="Ben" status="上課點數：120" />
            <BurgerItem to="./cart" onClick={handleMenuToggle}>
              購物車
            </BurgerItem>
            <BurgerItem to="/calendar" onClick={handleMenuToggle}>
              行事曆
            </BurgerItem>
            <BurgerItem to="/point" onClick={handleMenuToggle}>
              儲值點數
            </BurgerItem>
            <BurgerItem to="/manage" onClick={handleMenuToggle}>
              管理後台
            </BurgerItem>
          </BurgerContent>
        )}
      </Burger>
    </AuthMenuContext.Provider>
  );
}

export default BurgerMenu;
