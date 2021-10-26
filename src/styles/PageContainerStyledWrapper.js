import styled from "styled-components";

/**
 * Main page grid structure skeleton.
 * @type {StyledComponent}
 */
export const PageContainerStyledWrapper = styled.div`
  display: grid;
  width: 100vw;
  min-height: 100vh;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: 4rem auto 3rem;
  grid-template-areas:
    "HeaderArea HeaderArea HeaderArea"
    "MainContentArea MainContentArea MainContentArea"
    "FooterArea FooterArea FooterArea";
`;

/**
 * Center part of rendered grid. Main content goes here
 * @type {StyledComponent}
 */

export const MainContentWrapper = styled.div`
  padding: var(--fs-base);
  background-color: rgba(0, 0, 0, 0.2);
  grid-area: MainContentArea;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

`;
/**
 * Header part of rendered grid. Navbar content goes here
 * @type {StyledComponent}
 */

export const HeaderStyledWrapper = styled.div`
  grid-area: HeaderArea;
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  border-bottom: 1px solid var(--clr-accent);


  h2 {
    margin-left: 1rem;
    padding: 10px;
    color: var(--clr-light);
    font-size: 2rem;
    font-family: var(--ff-body-bold);

  }
`;
/**
 * Footer part of rendered grid. Impressum content goes here
 * @type {StyledComponent}
 */

export const FooterStyledWrapper = styled.div`
  grid-area: FooterArea;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0 14px 28px, rgba(0, 0, 0, 0.22) 0 10px 10px;

`;
/**
 *Error style
 * @type {StyledComponent}
 */
export const ErrorMessage = styled.h1`
  text-align: center;
  vertical-align: center;
  color: red;
`;

/**
 * Main content Loading message style.
 * @type {StyledComponent}
 */
export const LoadingMessage = styled.h1`
  text-align: center;
  color: var(--clr-primary-100);
  font-size: 2rem;
`;
