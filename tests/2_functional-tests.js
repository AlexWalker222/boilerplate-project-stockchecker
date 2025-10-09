'use strict';
const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
chai.use(chaiHttp);
var suite = chai.suite;

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
            if (err) console.log(err, "stock: GOLD request error");
            assert.equal(res.status, 200);
            assert.equal(res.body.stockData.stock, "GOLD");
            assert.exists(res.body.stockData.price, "GOLD has a price");
            done();
          });
        done();
      });
    test("Viewing one stock and liking it: GET request to /api/stock-prices/", function (done) {
      chai
        .request(server)
        .get("/api/stock-prices/")
        .set("content-type", "application/json")
        .query({ stockData: "TSLA", like: true })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.exists(res.body.stockData.stock, "TSLA");
          assert.exists(res.body.stockData.like, 1);
          assert.exists(res.body.stockData.price, "TSLA has a price");
          done();
        });
    });
    test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", function (done) {
      chai
        .request(server)
        .get("/api/stock-prices")
        .set("content-type", "application/json")
        .query({ stockData: { stock: "GOLD", like: true } })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, "GOLD");
          assert.exists(res.body.stockData[0].likes, 1);
          assert.exists(res.body.stockData[0].price, "GOLD has a price");
          done();
        });
    });
    test("Viewing two stocks: GET request to /api/stock-prices/", function (done) {
      chai
        .request(server)
        .get("/api/stock-prices/")
        .set("content-type", "application/json")
        .query({ stock: ["AMZN", "T"] })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, "AMZN");
          assert.equal(res.body.stockData[1].stock, "T");
          assert.exists(res.body.stockData[0].price, "AMZN has a price");
          assert.exists(res.body.stockData[1].price, "T has a price");
          assert.exists(res.body.stockData[0].rel_likes, "has rel_likes");
          assert.exists(res.body.stockData[1].rel_likes, "has rel_likes");
          done();
        });
    });
    test("Viewing two stocks and liking them: GET request to /api/stock-prices/", function (done) {
      chai.request(server).get("/api/stock-prices/").set("content-type", "application/json").query({
        "stock": ["AMZN", "T"], like: true
      })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, "AMZN");
          assert.equal(res.body.stockData[1].stock, "T");
          assert.exists(res.body.stockData[0].price, "AMZN has a price");
          assert.exists(res.body.stockData[1].price, "T has a price");
          assert.exists(res.body.stockData[0].rel_likes, "has rel_likes");
          assert.exists(res.body.stockData[1].rel_likes, "has rel_likes");
          done();
        });
    });
  });
});