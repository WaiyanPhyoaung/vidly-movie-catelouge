import React from "react";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import Posts from "./Posts";
import ProductDetails from "./ProductDetails";
import Products from "./Products";

function MainRoute() {
  return (
    <Router>
      <main>
        <ul>
          <li>
            <Link to="/posts">posts</Link>
          </li>
          <li>
            <Link to="/products">products</Link>
          </li>
          <li>
            <Link to="/home">home</Link>
          </li>
        </ul>
      </main>
      <main>
        <Switch>
          <Route path="/posts" component={Posts} />
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/products" component={Products} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/home" component={Home} />

          <Route path="/" exact component={Home} />
          <Redirect to="/notFound" />

          {/* <Route path="*" component={NotFound} /> */}
        </Switch>
      </main>
    </Router>
  );
}

export default MainRoute;
