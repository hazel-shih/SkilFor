import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Icons from "../Icon/Icons";
import LogoSrc from "../../img/logo/logo.svg";
import { IconDiv } from "../Icon/IconDiv";
import { MEDIA_QUERY_SM, MEDIA_QUERY_MD } from "../constants/breakpoints";
import BurgerMenu from "../BurgerMenu";
import {
  AuthContext,
  AuthLoadingContext,
  AuthCartContext,
} from "../../contexts";
import { setAuthToken } from "../../utils";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  border-top: 20px solid ${(props) => props.theme.colors.green_dark};
  background: white;
  padding: 10px 30px;
  margin: 0 auto;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 100%;
  ${MEDIA_QUERY_SM} {
    max-width: 768px;
    width: 100%;
    padding: 10px 20px;
  }
`;

const Logo = styled(Link)`
  cursor: pointer;
`;

const Img = styled.img`
  height: 80px;
  width: 80px;
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavbarList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  list-style: none;
  height: 50px;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.grey_dark};
  opacity: 1;
  font-weight: bold;
  cursor: pointer;
  margin: 8px;
  padding: 6px;
  &:hover {
    opacity: 0.7;
  }
  ${MEDIA_QUERY_MD} {
    padding: 2px;
    margin: 4px;
  }
  ${MEDIA_QUERY_SM} {
    margin: 1px;
  }
`;

const CartCount = styled.div`
  position: absolute;
  top: 0px;
  right: -10px;
  min-width: 8px;
  height: 25px;
  line-height: 10px;
  margin-top: -10px;
  padding: 5px;
  color: white;
  text-align: center;
  text-shadow: 0 1px rgba(0, 0, 0, 0.2);
  background: #e23442;
  border: 1px solid #911f28;
  border-radius: 10px;
`;

function Nav() {
  const { user, setUser } = useContext(AuthContext);
  const { isLoading } = useContext(AuthLoadingContext);
  const { cartNumber, setCartNumber } = useContext(AuthCartContext);
  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    setCartNumber(null);
  };
  const { t, i18n } = useTranslation();
  const handleSelectLanguage = (e) => {
    const { value } = e.target;
    if (value === "en") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("zh");
    }
  };
  return (
    <Container>
      <Navbar>
        <Logo to="./">
          <Img src={LogoSrc} />
        </Logo>
        <div>
          {!isLoading && (
            <NavbarList>
              <NavItem to="./filter">{t("搜尋課程")}</NavItem>
              {!user && (
                <>
                  <NavItem to="./login">{t("登入")}</NavItem>
                  <NavItem to="./register">{t("註冊")}</NavItem>
                </>
              )}
              {user && (
                <NavItem to="./" onClick={handleLogout}>
                  {t("登出")}
                </NavItem>
              )}
              <NavItem to="./qa">
                <IconDiv>
                  <Icons.NavIcons.Question />
                </IconDiv>
              </NavItem>
              {user && user.identity === "student" && (
                <NavItem to="./cart">
                  <IconDiv>
                    <Icons.NavIcons.Cart />
                    {cartNumber > 0 && <CartCount>{cartNumber}</CartCount>}
                  </IconDiv>
                </NavItem>
              )}
              {user && <BurgerMenu />}
              <select
                onChange={handleSelectLanguage}
                defaultValue={i18n.language}
              >
                <option value="zh">繁體中文</option>
                <option value="en">English</option>
              </select>
            </NavbarList>
          )}
        </div>
      </Navbar>
    </Container>
  );
}

export default Nav;
