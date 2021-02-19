import { shallow } from "enzyme";
import Item from ".";
import { sizeClass } from "./index";

describe("item", () => {

    it("adds blank className when no item", () => {
        const component = shallow(<Item />);
        const classes = component.find(".item").prop("className");

        expect(classes.includes("blank")).toBe(true);
    });

    it("does not add blank className when item", () => {
        const component = shallow(<Item item={{}} />);
        const classes = component.find(".item").prop("className");

        expect(classes.includes("blank")).toBe(false);
    })

    it("renders image when item provided", () => {
        const item = { file: "test" };
        const component = shallow(<Item item={item} />);

        const img = component.find("img");

        expect(img.getElement().props.src).toEqual(`images/${item.file}`);
    })

    it("adds small item className when sm", () => {
        const component = shallow(<Item size="sm" />);
        const classes = component.find(".item").prop("className");

        expect(classes.includes(sizeClass.sm,)).toBe(true);
    })

    it("does not add small item className when not sm", () => {
        const component = shallow(<Item />);
        const classes = component.find(".item").prop("className");

        expect(classes.includes(sizeClass.sm)).toBe(false);
    })

    it("adds large item className when lg", () => {
        const component = shallow(<Item size="lg" />);
        const classes = component.find(".item").prop("className");

        expect(classes.includes(sizeClass.lg)).toBe(true);
    })

    it("does not add large item className when not lg", () => {
        const component = shallow(<Item />);
        const classes = component.find(".item").prop("className");

        expect(classes.includes(sizeClass.lg)).toBe(false);
    })

    it("applies provided className to span", () => {
        const expected = "my-class my-other-class";
        const component = shallow(<Item className={expected} />);

        const classes = component.find(".item").prop("className");

        expect(classes.includes(expected)).toBe(true);
    })
});