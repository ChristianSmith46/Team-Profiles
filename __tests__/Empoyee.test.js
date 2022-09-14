const Employee = require("../lib/Employee");
describe("Employee Class", () => {
    const employee = new Employee("Christian", 1, "christian.46.smith@gmail.com");
    it("Returns name with getName()", () => {
        expect(employee.getName()).toBe("Christian");
    });

    it("Returns id with getId()", () => {
        expect(employee.getId()).toBe(1);
    });

    it("Returns email with getEmail()", () => {
        expect(employee.getEmail()).toBe("christian.46.smith@gmail.com");
    });

    it("Returns role with getRole()", () => {
        expect(employee.getRole()).toBe("Employee");
    });
});