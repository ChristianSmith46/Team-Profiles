const Intern = require("../lib/Intern");
describe("Intern Class", () => {
    const intern = new Intern("Christian", 1, "christian.46.smith@gmail.com", "UConn");
    it("Returns name with getName()", () => {
        expect(intern.getName()).toBe("Christian");
    });

    it("Returns id with getId()", () => {
        expect(intern.getId()).toBe(1);
    });

    it("Returns email with getEmail()", () => {
        expect(intern.getEmail()).toBe("christian.46.smith@gmail.com");
    });

    it("Returns role with getRole()", () => {
        expect(intern.getRole()).toBe("Intern");
    });

    it("Returns their school with getSchool()", () => {
        expect(intern.getSchool()).toBe("UConn");
    });
});