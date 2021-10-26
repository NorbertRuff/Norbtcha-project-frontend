import {
    FooterStyledWrapper,
    HeaderStyledWrapper,
    PageContainerStyledWrapper
} from "./styles/PageContainerStyledWrapper";
import GithubCorner from "react-github-corner";
import MainPage from "./components/pages/MainPage";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <PageContainerStyledWrapper>
                <HeaderStyledWrapper role="header">
                    <Link data-testid="homeLink" to={"/"}><h2>Norbtcha demo</h2></Link>
                    <GithubCorner href="https://github.com/NorbertRuff/balasys-project" size="60" octoColor=""
                                  bannerColor="rgb(0, 174, 239)"/>
                </HeaderStyledWrapper>
                <Switch>
                    <Route path="/" exact>
                        <MainPage/>
                    </Route>
                </Switch>
                <FooterStyledWrapper role="footer">
                    <h4>Created by Norbert Ruff</h4>
                </FooterStyledWrapper>
            </PageContainerStyledWrapper>
        </BrowserRouter>
    );
}

export default App;
