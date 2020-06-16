import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import Modal from 'react-modal'
import RefProvider from './_useRefHook'
import Home from './components/Home/Home'
import Electricos from './components/Productos/Electricos'
import Electronicos from './components/Productos/Electronicos'

// import Chat from './components/Chat/Chat';
// import Product from './components/Products/Product'
// import Electrics from './components/Products/Electrics'
// import ChatProv from './_useChat'





const client = new ApolloClient({
  uri: "http://api.maxpower-ar.com/graphql"
})


Modal.setAppElement('#root')

function App() {
  return (

    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <RefProvider>

            <Route component={Home} path="/" exact />
            <Route component={Electricos} path="/productos-electricos" exact />
            <Route component={Electronicos} path="/productos-electronicos" exact />

          </RefProvider>


          {/* <ChatProv>
            <Route component={Chat} path="/chat" exact />
          </ChatProv> */}

        </Switch>
      </BrowserRouter>
    </ApolloProvider>



  );
}

export default App;

