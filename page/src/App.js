import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Chat from './components/Chat/Chat';
import Product from './components/Products/Product'
import Electrics from './components/Products/Electrics'
import ChatProv from './_useChat'
import Home from './components/Home/Home'

const client = new ApolloClient({
  uri: "http://api.maxpower-ar.com/graphql"
})

function App() {
  return (
    // <ApolloProvider client={client}>
    //   <div className="App">
    //     <Product />
    //   </div>
    // </ApolloProvider>


    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Product} path="/productos-electronicos" exact />
          <Route component={Electrics} path="/productos-electricos" exact />

          <ChatProv>
            <Route component={Chat} path="/chat" exact />
          </ChatProv>

        </Switch>
      </BrowserRouter>
    </ApolloProvider>



  );
}

export default App;

