import React from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Menus/Sidebar'
import UserWorkspace from "../../components/UserInterface/UserWorkspace"
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
import { backgroundTheme } from "../../components/Assets/variables";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div`
${ backgroundTheme }
`

const WorkspacePage = () => {
  return (
    <Container>
      <MetaDecorator
        title={MetaData.workspacePageTitle}
        description={MetaData.workspacePageDesc}
      />
      <Sidebar />
      <UserWorkspace />
    </Container>
  )
}

export default WorkspacePage