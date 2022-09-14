const Manager = require("../lib/Manager");
describe("Manager Class", () => {
    const manager = new Manager("Christian", 1, "christian.46.smith@gmail.com", 2);
    it("Returns name with getName()", () => {
        expect(manager.getName()).toBe("Christian");
    });

    it("Returns id with getId()", () => {
        expect(manager.getId()).toBe(1);
    });

    it("Returns email with getEmail()", () => {
        expect(manager.getEmail()).toBe("christian.46.smith@gmail.com");
    });

    it("Returns role with getRole()", () => {
        expect(manager.getRole()).toBe("Manager");
    });

    it("Returns their office number with getOfficeNumber()", () => {
        expect(manager.getOfficeNumber()).toBe(2);
    });
});