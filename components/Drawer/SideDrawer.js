import React, { useContext } from "react";
import Modal from "react-native-modal";
import MainMenu from "../Menu/MainMenu";
import { MainMenuContext } from "../../helpers/Context";
import { globalStyles } from "../../constants/Styles";

const SideDrawer = () => {
  const { isMainMenuVisible, toggleMainMenu } = useContext(MainMenuContext);

  return (
    <Modal 
      isVisible={isMainMenuVisible} 
      animationIn='slideInRight'
      animationOut='slideOutRight'
      swipeDirection='right'
      onSwipeComplete={toggleMainMenu} 
      style={[globalStyles.margin0]}
    >
      <MainMenu toggleMainMenu={toggleMainMenu}></MainMenu>
    </Modal>
  )
}

export default SideDrawer;