import React from "react";
import {Tabs,TabList,TabPanels,Tab,TabPanel,Container,} from "@chakra-ui/react";
import './auth.css'
import LoginPage from "./auth/loginPage";
import { SignUp } from "./auth/signup";


export default function Auth() {
  return (
    <div style={{backgroundColor:"white",width:"100%",height:"100%",display:"grid",placeItems:"center"}}>
      <Container className="container" style={{height:"500px"}}>
<Tabs variant='soft-rounded' colorScheme='green'style={{backgroundColor:"yellow",height:"100%",width:"100%",position:"absolute",backgroundColor:"brown",borderRadius:"10px",padding:"10px"}} >
  <TabList style={{display:"flex",justifyContent:"center"}}>
    <Tab style={{color:"white"}}>Sign in</Tab>
    <Tab style={{color:"white"}}>Sign up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <LoginPage />
    </TabPanel>
    <TabPanel>
      <SignUp />
    </TabPanel>
  </TabPanels>
</Tabs>
    </Container>
    </div>
  );
}
