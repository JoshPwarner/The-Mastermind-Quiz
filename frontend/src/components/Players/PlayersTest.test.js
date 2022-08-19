import { default as Players } from '../Players/index';
import {screen, render} from "@testing-library/react"
import userEvent from "@testing-library/user-event";

describe ('players'), () => {
    test("it  render Paragraph", () =>  {
        render(<Players />);
        
    })
}