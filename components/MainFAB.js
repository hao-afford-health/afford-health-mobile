import React, { useContext } from "react";
import { FAB } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faMinus, faMoneyBill, faTruckMedical, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { MainFabContext, SubMenuContext } from "../helpers/Context";
import { globalStyles } from "../constants/Styles";

const MainFAB = () => {
  const { open, onFabStateChange } = useContext(MainFabContext);
  const { toggleSubMenu, setSubMenuType } = useContext(SubMenuContext);

  return (
    <FAB.Group
      fabStyle={[
        globalStyles.borderRadius50,
        !open ? globalStyles.backgroundColorWhite : globalStyles.backgroundColorGreenMunsell
      ]}
      open={open}
      visible
      icon={() => !open ? <FontAwesomeIcon icon={ faPlus } size={ 24 } /> : <FontAwesomeIcon icon={ faMinus } size={ 24 } />}
      actions={[
        {
          icon: () => <FontAwesomeIcon icon={ faMoneyBill } size={ 24 } />,
          label: 'Add Bill/Claim',
          style: globalStyles.backgroundColorWhite,
          onPress: () => {
            setSubMenuType('File');
            toggleSubMenu();
          },
        },
        {
          icon: () => <FontAwesomeIcon icon={ faTruckMedical } size={ 24 } />,
          label: 'Add Provider',
          style: globalStyles.backgroundColorWhite,
          onPress: () => {
          },
        },
        {
          icon: () => <FontAwesomeIcon icon={ faCalendarDays } size={ 24 } />,
          label: 'Add Event',
          style: globalStyles.backgroundColorWhite,
          onPress: () => {
            setSubMenuType('Event');
            toggleSubMenu();
          }
        },
      ]}
      onStateChange={onFabStateChange}
    />
  );
}

export default MainFAB;