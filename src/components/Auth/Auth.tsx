import { useState } from "react";
import { Button } from "antd";
import { User, UserManager, WebStorageStateStore } from "oidc-client";
import styled from "styled-components";


const POPUP_WINDOW_WIDTH = 500;
const POPUP_WINDOW_HEIGHT = 600;

const userManager = new UserManager({
  authority: "https://sts-identity.intelwash.ru", // Адрес IdentityServer4
  client_id: "UiTest.client", // Идентификатор клиента
  redirect_uri: "https://sts-identity.intelwash.ru/connect/authorize", // URL, на который будет перенаправлен пользователь после аутентификации
  response_type: "code", // Тип ответа
  scope: "UiTest.API", // Запрашиваемые ресурсы
  post_logout_redirect_uri: "http://localhost:3000", // URL, на который будет перенаправлен пользователь после выхода из системы
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  popupWindowFeatures: `height=${POPUP_WINDOW_HEIGHT},width=${POPUP_WINDOW_WIDTH},left=${window.screenX + (window.innerWidth - POPUP_WINDOW_WIDTH) / 2},top=${window.screenY + (window.innerHeight - POPUP_WINDOW_HEIGHT) / 2}`,
});


const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginButton = styled(Button)`
  margin-bottom: 10px;
`;

const AdminButton = styled(Button)`
  margin-bottom: 10px;
`;

const Auth = () => {
  const [user, setUser] = useState<User | null>(null);


  const login = async () => {
    try {
      const user = await userManager.signinPopup();
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  }

  const logout = () => {
    userManager.signoutRedirect();
    setUser(null);
  }

  return (
    <AuthWrapper>
      <LoginButton type="primary" onClick={login}>
        Войти
      </LoginButton>
      <AdminButton type="primary" onClick={logout}>
        Выйти
      </AdminButton>
    </AuthWrapper>
  );
};

export default Auth;
