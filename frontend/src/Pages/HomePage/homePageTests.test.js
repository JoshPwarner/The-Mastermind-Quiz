import { default as HomePage } from ".";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter as Router } from "react-router-dom";
describe("HomePage", () => {
    let getResultMock;

    beforeEach(() => {
        getResultMock = jest.fn();
        render(
            <Router>
                <Provider store={store}>
                    <HomePage getResult={getResultMock} />
                </Provider>
            </Router>
        );
    });

    test("it renders a form", () => {
        let form = screen.getByRole("form");
        expect(form).toBeInTheDocument();
    });

    test("it renders the AboutUsPage ", () => {
        const AboutusPage = screen.getByRole("aboutGame");
        expect(AboutusPage).toBeInTheDocument();
      });
});
