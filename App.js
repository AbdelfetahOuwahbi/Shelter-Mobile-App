import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Welcoming Pages
import WelcomingDetails from './src/Welcoming';
import LoginFormDetails from './src/Login';
import RegistrationFormDetails from './src/Register';
import FirstEntryDetails from './src/FirstEntry';

//User Pages
import HomeDetails from './src/UserPages/Home';
import DiscoverHousesDetails from './src/UserPages/DiscoverHouses';
import FavouriteDetails from './src/UserPages/Favourite';
import NotificationDetails from './src/UserPages/Notification';
import ReservationCardDetails from './src/UserPages/ReservationCard';
import VerifyAvailabilityDetails from './src/UserPages/VerifyAvailability';
import ReportDetails from './src/UserPages/Report';
import ProviderDetails from './src/UserPages/Provider';
import ProfileDetails from './src/UserPages/Profile';
import CreateItemDetails from './src/UserPages/CreateItem';
import MyListingDetails from './src/UserPages/MyListing';
import MyItemDetailsDetails from './src/UserPages/MyItemDetails';
import ProviderListingDetails from './src/UserPages/ProviderListing';
import EditPersonalInfoDetails from './src/UserPages/EditPersonalInfo';
import EditItemDetails from './src/UserPages/EditItem';
import MapScreenDetails from './src/UserPages/Map';
import OfferHousesDetails from './src/UserPages/OfferHouses';
import OfferHousesProvidersDetails from './src/UserPages/OfferHousesProviders';
import ProviderResponseOnOrderDetails from './src/UserPages/ProviderResponseOnOrder';
import CostumerViewOnOrderResponseDetails from './src/UserPages/CostumerViewOnOrderResponse';
import MyOrdersDetails from './src/UserPages/MyOrders';
import MyOrderDetailsDetails from './src/UserPages/MyOrderDetails';
import AddPayoutMethodDetails from './src/UserPages/AddPayoutMethod';
import ChangePayoutMethodDetails from './src/UserPages/ChangePayoutMethod';
import PaymentDetails from './src/UserPages/Payment';

//Administrator Pages

import DashboardDetails from './src/AdministratorPages/Dashboard';
import AdminProfileDetails from './src/AdministratorPages/AdminProfile';
import EditAdminInfosDetails from './src/AdministratorPages/EditAdminInfos';
import EditUserDetails from './src/AdministratorPages/EditUser';
import EditHouseDetails from './src/AdministratorPages/EditHouse';
import FullReportDetails from './src/AdministratorPages/FullReport';

//Both
import ViewPictureDetails from './src/ViewPicture';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "FirstEntry">

        {/* Simple User (Provider & Customer) Set Of Navigatable Pages */}

        <Stack.Screen name="FirstEntry" component={FirstEntryDetails} options={{ headerShown: false }} />

        <Stack.Screen name="Welcoming" component={WelcomingDetails} options={{ headerShown: false }} />

        <Stack.Screen name="RegistrationForm" component={RegistrationFormDetails} options={{ headerShown: false }} />

        <Stack.Screen name="LoginForm" component={LoginFormDetails} options={{ headerShown: false }} />

        <Stack.Screen name="Home" component={HomeDetails} options={{ headerShown: false }} />

        <Stack.Screen name="DiscoverHouses" component={DiscoverHousesDetails} options={{ headerShown: false }} />

        <Stack.Screen name="Favourite" component={FavouriteDetails} options={{ headerShown: false }} />

        <Stack.Screen name="Notification" component={NotificationDetails} options={{ headerShown: false }} />

        <Stack.Screen name="Report" component={ReportDetails} options={{ headerShown: false }} />

        <Stack.Screen name="ReservationCard" component={ReservationCardDetails} options={{ headerShown: false }} />

        <Stack.Screen name="Provider" component={ProviderDetails} options={{ headerShown: false }} />

        <Stack.Screen name="Profile" component={ProfileDetails} options={{ headerShown: false }} />

        <Stack.Screen name="MyListing" component={MyListingDetails} options={{ headerShown: false }} />
        
        <Stack.Screen name="MyItemDetails" component={MyItemDetailsDetails} options={{ headerShown: false }} />

        <Stack.Screen name="ProviderListing" component={ProviderListingDetails} options={{ headerShown: false }} />

        <Stack.Screen name="CreateItem" component={CreateItemDetails} options={{ headerShown: false }} />
      
        <Stack.Screen name="EditPersonalInfo" component={EditPersonalInfoDetails} options={{ headerShown: false }} />
     
        <Stack.Screen name="EditItem" component={EditItemDetails} options={{ headerShown: false }} />

        <Stack.Screen name="MapScreen" component={MapScreenDetails} options={{ headerShown: false }} />

        <Stack.Screen name="OfferHouses" component={OfferHousesDetails} options={{ headerShown: false }} />

        <Stack.Screen name="OfferHousesProviders" component={OfferHousesProvidersDetails} options={{ headerShown: false }} />

        <Stack.Screen name="VerifyAvailability" component={VerifyAvailabilityDetails} options={{ headerShown: false }} />

        <Stack.Screen name="ProviderResponseOnOrder" component={ProviderResponseOnOrderDetails} options={{ headerShown: false }} />

        <Stack.Screen name="CostumerViewOnOrderResponse" component={CostumerViewOnOrderResponseDetails} options={{ headerShown: false }} />

        <Stack.Screen name="MyOrders" component={MyOrdersDetails} options={{ headerShown: false }} />

        <Stack.Screen name="MyOrderDetails" component={MyOrderDetailsDetails} options={{ headerShown: false }} />

        <Stack.Screen name="AddPayoutMethod" component={AddPayoutMethodDetails} options={{ headerShown: false }} />
        
        <Stack.Screen name="ChangePayoutMethod" component={ChangePayoutMethodDetails} options={{ headerShown: false }} />

        <Stack.Screen name="Payment" component={PaymentDetails} options={{ headerShown: false }} />



        {/* Administartor's Set Of Navigatable Pages */}

        <Stack.Screen name="Dashboard" component={DashboardDetails} options={{ headerShown: false }} />

        <Stack.Screen name="AdminProfile" component={AdminProfileDetails} options={{ headerShown: false }} />

        <Stack.Screen name="EditAdminInfos" component={EditAdminInfosDetails} options={{ headerShown: false }} />

        <Stack.Screen name="EditUser" component={EditUserDetails} options={{ headerShown: false }} />

        <Stack.Screen name="EditHouse" component={EditHouseDetails} options={{ headerShown: false }} />

        <Stack.Screen name="FullReport" component={FullReportDetails} options={{ headerShown: false }} />



        {/* Administartor's Set Of Navigatable Pages */}


        <Stack.Screen name="ViewPicture" component={ViewPictureDetails} options={{ headerShown: false }} />


      </Stack.Navigator>

    </NavigationContainer>
    
  );
}

