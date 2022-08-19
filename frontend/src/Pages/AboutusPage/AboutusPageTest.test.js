import { default as Lobby } from ".";
import { default as WaitingRoom } from "../../components/WaitingRoom";
import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import store from "../../store";
import { MemoryRouter as Router } from "react-router-dom";

const fetchMock = require("jest-fetch-mock");
fetchMock.enableMocks();
describe("AboutusPage", () => {
  let getResultMock;

  beforeEach(() => {
    getResultMock = jest.fn();
    render(
      <Router>
        <Provider store={store}>
          <AboutusPage getResult={getResultMock} />
        </Provider>
      </Router>
    );
  });
  test("it renders the HomePage component", () => {
    const backHomePage = screen.getByRole("backHome");
    expect(backHomePage).toBeInTheDocument();
  });
});
