import React, { useContext }  from 'react';
import { IconButton } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { MainMenuContext } from "../helpers/Context";

const RightHeader = () => {
  const { toggleMainMenu } = useContext(MainMenuContext);

  return (
    <IconButton
      icon={() => <FontAwesomeIcon icon={ faBars } size={24} />}
      size={10}
      onPress={toggleMainMenu}
    />
  )
}

export default RightHeader;