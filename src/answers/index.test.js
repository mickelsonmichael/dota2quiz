import React from "react";
import { shallow } from "enzyme";
import Answers from ".";

describe("Answer", () => {
    it("includes recipe when required", () => {
        const answerComponent = getItemByRecipe(true);

        const expectedChildrenCount = 1;
        const actualChildrenCount = answerComponent.find(".answer-components").children().length;

        expect(actualChildrenCount).toEqual(expectedChildrenCount);
    });

    it("excludes recipe when not required", () => {
        const answerComponent = getItemByRecipe(false);

        const expectedChildrenCount = 0;
        const actualChildrenCount = answerComponent.find(".answer-components").children().length;

        expect(actualChildrenCount).toEqual(expectedChildrenCount);
    });

    function getItemByRecipe(hasRecipe) {
        const item = { components: [], recipe: hasRecipe };
        return shallow(<Answers item={item} />);
    }
    
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

