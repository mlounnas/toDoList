import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import React from 'react';
import DoneStackScreens from './DoneStackScreen';
import InProgressScreens from './InProgressScreens';
import StackScreens from './StackScreens';


const BottomNavigator = (props : any)=> {

    const Tab = createBottomTabNavigator();
    return(
        
        <Tab.Navigator screenOptions={({ route }: any): any => ({
            tabBarIcon: () => {
              const icons: any = {
                ToDoList: "md-list-outline",
                inProgressList: "md-time-outline",
                DoneList: "md-checkmark-outline",
              };

              return (

                <Icon name={icons[route.name]} type='Ionicons' />


              )
            }
          })}
          >
            <Tab.Screen name="ToDoList" component={StackScreens} />
            <Tab.Screen name="inProgressList" component={InProgressScreens} />
            <Tab.Screen name="DoneList" component={DoneStackScreens} />
          </Tab.Navigator>
        
    )
}
export default BottomNavigator;