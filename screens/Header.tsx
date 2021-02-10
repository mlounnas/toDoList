import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
export default class HeaderMenu extends Component {
  render() {
    return (
      
        <Header >
          <Left>
            <Button transparent>
              <Icon name='build' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='build' />
            </Button>
            <Button transparent>
              <Icon name='build' />
            </Button>
            <Button transparent>
              <Icon name='build' />
            </Button>
          </Right>
        </Header>
      
    );
  }
}
