const Engineer = require("../lib/Engineer");
describe("Engineer Class", () => {
    const engineer = new Engineer("Christian", 1, "christian.46.smith@gmail.com", "christiansmith46");
    it("Returns name with getName()", () => {
        expect(engineer.getName()).toBe("Christian");
    });

    it("Returns id with getId()", () => {
        expect(engineer.getId()).toBe(1);
    });

    it("Returns email with getEmail()", () => {
        expect(engineer.getEmail()).toBe("christian.46.smith@gmail.com");
    });

    it("Returns role with getRole()", () => {
        expect(engineer.getRole()).toBe("Engineer");
    });

    it("Returns github username with getGithub()", () => {
        expect(engineer.getGithub()).toBe("christiansmith46");
    });
});