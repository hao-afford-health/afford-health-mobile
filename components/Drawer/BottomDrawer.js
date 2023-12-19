import React, { useContext } from "react";
import Modal from "react-native-modal";
import SubMenu from "../Menu/SubMenu";
import { SubMenuContext } from "../../helpers/Context";

const BottomDrawer = () => {
  const { isSubMenuVisible, toggleSubMenu, subMenuType } = useContext(SubMenuContext);

  return (
    <Modal
      isVisible={isSubMenuVisible} 
      onBackdropPress={toggleSubMenu}
    >
      <SubMenu toggleSubMenu={toggleSubMenu} subMenuType={subMenuType}></SubMenu>
    </Modal>
  )
}

export default BottomDrawer;