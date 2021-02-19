import { shallow } from "enzyme";
import Answers from ".";

describe("Answer", () => {
    it("includes recipe when required", () => {
        const item = { components: [], recipe: true };
        const answerComponent = shallow(<Answers item={item} />);

        const expectedChildrenCount = 1;
        const actualChildrenCount = answerComponent.find(".answer-components").children().length;

        expect(actualChildrenCount).toEqual(expectedChildrenCount);
    });

    it("excludes recipe when not required", () => {
        const item = { components: [], recipe: false };
        const answerComponent = shallow(<Answers item={item} />);

        const expectedChildrenCount = 0;
        const actualChildrenCount = answerComponent.find(".answer-components").children().length;

        expect(actualChildrenCount).toEqual(expectedChildrenCount);
    });
    
    it("renders required components", () => {
        const components = [
            { id: "clarity" },
            { id: "salve" }
        ];

        const item = { components: components.map(c => c.id), recipe: false };
        const answerComponent = shallow(<Answers item={item} />);

        const expectedChildrenCount = components.length;
        const actualChildrenCount = answerComponent.find(".answer-components").children().length;

        expect(actualChildrenCount).toEqual(expectedChildrenCount);
    });

    it("renders required components with recipe", () => {
        const components = [
            { id: "clarity" },
            { id: "salve" }
        ];

        const item = { components: components.map(c => c.id), recipe: true };
        const answerComponent = shallow(<Answers item={item} />);

        const expectedChildrenCount = components.length + 1;
        const actualChildrenCount = answerComponent.find(".answer-components").children().length;

        expect(actualChildrenCount).toEqual(expectedChildrenCount);
    });
})

