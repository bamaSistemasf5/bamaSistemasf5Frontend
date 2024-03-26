import { beforeEach, it } from "node:test";

describe("Login",()=>{
    beforeEach(()=>{
        cyan.visit("http://localhost:5173/")
    });
    it("Deberia encontrar button tipo submit", () =>{
        cy.get("button").contains("submit ");
    })
});