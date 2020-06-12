import React, { useRef } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
// import Chat from './components/Chat/Chat';
// import Product from './components/Products/Product'
// import Electrics from './components/Products/Electrics'
// import ChatProv from './_useChat'
import Home from './components/Home/Home'
import Electricos from './components/Productos/Electricos'
import Electronicos from './components/Productos/Electronicos'


const client = new ApolloClient({
  uri: "http://api.maxpower-ar.com/graphql"
})



function App() {


  return (

    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Electricos} path="/productos-electricos" exact />
          <Route component={Electronicos} path="/productos-electronicos" exact />

          {/* <ChatProv>
            <Route component={Chat} path="/chat" exact />
          </ChatProv> */}

        </Switch>
      </BrowserRouter>
    </ApolloProvider>



  );
}

export default App;

