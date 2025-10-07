'use strict';
const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
chai.use(chaiHttp);
const expect = chai.expect;
const suite = require('mocha').suite;

suite("Functional tests", function () {
  suite("5 functional get request tests", function () {
    test("Viewing one stock: GET request to /api/stock-prices/",
      function (done) {
        chai
          .request(server)
          .get("/api/stock-prices/")
          .set("content-type", "application/json")
          .query({ stock: "GOLD" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.stockData.stock, "GOLD");
            assert.exists(res.body.stockData.price, "GOLD has a price");
            done();
          })
      });
    test("Viewing one stock and liking it: GET request to /api/stock-prices/",
      function (done) {
        chai
          .request(server)
          .get("/api/stock-prices/")
          .set("content-type", "application/json")
          .query({ stock: "TSLA", like: true })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.stockData.stock, "TSLA");
            assert.equal(res.body.stockData.likes, 1);
            assert.exists(res.body.stockData.price, "TSLA has a price");
            done();
          });
      });
    test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", function (done) {
      chai
        .request(server)
        .get("/api/stock-prices/")
        .set("content-type", "application/json")
        .query({ stock: "FCX", like: true })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          assert.equal(res.body.stockData.stock, "FCX");
          assert.equal(res.body.stockData.likes, 1);
          assert.equal(res.body.stockData.price, "FCX has a price");
          done();
        });
    });
    test("Viewing two stocks: GET request to /api/stock-prices/",
      function (done) {
        chai
          .request(server).get("/api/stock-prices/")
          .set("content-type", "application/json")
          .query({ stock: ["TSM", "T"] })
          .end(function (err, res) {
            expect(res).to.have.status(200);
            assert.equal(res.body.stockData[0].stock, "TSM");
            assert.equal(res.body.stockData[1].stock, "T")
            assert.equal(res.body.stockData[0].price, "TSM has a price");
            assert.equal(res.body.stockData[1].price, "T has a price")
            done();
          });
      })
  });
  test("Viewing two stocks and liking them: GET request to /api/stock-prices/", function (done) {
    chai
      .request(server)
      .get("/api/stock-prices/")
      .set("content-type", "application/json")
      .query({ stock: ["TSM", "T"], like: true })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.stockData[0].stock, "TSM");
        expect(res.body.stockData[1].stock, "T");
        expect(res.body.stockData[0].price, "TSM has a price");
        expect(res.body.stockData[1].price, "T has a price");
        expect(res.body.stockData[0].rel_likes, "has rel_likes");
        expect(res.body.stockData[1].rel_likes, "has rel_likes");
        done();
      });
  })
});