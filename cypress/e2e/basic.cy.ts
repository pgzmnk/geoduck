describe("Allotments", () => {
  it("should render components on the main page", () => {
    // Start from the index page
    cy.visit("/");

    // Should render top navbar
    cy.get(`[data-testid=navbar-top]`).should("exist");

    // Should render Mapbox
    cy.get(".mapboxgl-canvas").should("exist");

    // Should render the Shell in the bottom bar
    cy.get(".shell_container").should("exist");
    cy.get(".xterm-screen", { timeout: 5000 }).should("exist");

    // Should render the left allotment
    cy.get(`[data-testid=allotment-left]`).should("exist");

    // Should render the bottom allotment
    cy.get(`[data-testid=allotment-bottom]`).should("exist");
  });
});
