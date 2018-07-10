const { getLastWeek } = require("../components/links/linksController");
const request = require('supertest');

describe("Test the root path", () => {
  test("It should response the GET method", async() =>{
    const response = await request(getLastWeek).get("/api/links/getlinks").query({ userid: 'Test1' })
    expect(response.statusCode).toBe(200)
    }
  );
});
