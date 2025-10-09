'use strict';
const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const { sanitizeFilter } = require('mongoose');
const { Stock } = require('../models');
chai.use(chaiHttp);
var suite = require('mocha').suite;

suite("Functional tests", function () {
  suite("6 functional get request tests", function () {
    test("Viewing one stock: GET request to /api/stock-prices/",
      function (done, err) {
        chai
          .request(server)
          .get("/api/stock-prices/")
          .set("content-type", "application/json")
          .query({ stock: "GOLD" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.stockData.stock, "GOLD");
            assert.exists(res.body.stockData.price, "GOLD has a price");
            assert.exists(res.body.stockData.likes, 0);
            done()
          });
        if (err) return console.log(err);
        else done();
      })
    test("Viewing one stock and liking it: GET request to /api/stock-prices/", function (done, err) {
      chai
        .request(server)
        .get("/api/stock-prices/")
        .set("content-type", "application/json")
        .query({ stock: ["TSLA"], like: true })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.exists(res.body.stockData[0].stock, "TSLA");
          assert.exists(res.body.stockData[0].like, 1);
          assert.exists(res.body.stockData[0].price, "TSLA has a price");
          if (err) return console.log(err);
          else {
            done();
          }
        });
      if (err) return console.log(err);
      else done();
    });
    test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", function (done, err) {
      chai
        .request(server)
        .get("/api/stock-prices")
        .set("content-type", "application/json")
        .query({ stock: ["GOLD"], like: true })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, "GOLD");
          assert.exists(res.body.stockData[0].likes, 1);
          assert.exists(res.body.stockData[0].price, "GOLD has a price");
          if (err) return console.log(err);
          else {
            done();
          }
        });
      if (err) return console.log(err)
      else done();
    });
    test("Viewing two stocks: GET request to /api/stock-prices/", function (done, err) {
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
          if (err) return console.log(err);
          else {
            done();
          }
        });
      if (err) return console.log(err);
      else {
        done()
      }
    });
    test("Viewing two stocks and liking them: GET request to /api/stock-prices/", function (done, err) {
      chai.request(server).get("/api/stock-prices/").set("content-type", "application/json").query({
        stock: ["AMZN", "T"], like: true
      })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, "AMZN");
          assert.equal(res.body.stockData[1].stock, "T");
          assert.exists(res.body.stockData[0].price, "AMZN has a price");
          assert.exists(res.body.stockData[1].price, "T has a price");
          assert.exists(res.body.stockData[0].rel_likes, "has rel_likes");
          assert.exists(res.body.stockData[1].rel_likes, "has rel_likes");
          if (err) return console.log(err);
          else done();
        }); if (err) {
          console.log(err);
        } else {
        done();
      }
    });
    test("testing Viewing one stock and liking it: GET request /api/stock-prices/", function (done, err) {
      chai.request(server).get("/api/stock-prices/").set("content-type", "application/json")
        .query({ stock: ["TSM"], like: true })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, "TSM");
          assert.exists(res.body.stockData[0].like, 1);
          assert.exists(res.body.stockData[0].stock, "TSM");
          assert.exists(res.body.stockData[0].like, 1);
          assert.exists(res.body.stockData[0].price, "TSM has a price");
          console.log(res.body)
          if (err) return console.log(err);
          else return done(res, err);
        });
      if (err) return console.log(err);
      else done();
    });
  })
});