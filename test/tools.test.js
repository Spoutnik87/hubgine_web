const assert = require("chai").assert;
const browserify = require("browserify");
const babelify = require("babelify");
const UglifyJS = require("uglify-js");

describe("Tools", () => {
    describe("Browserify + uglify-js test", function() {
        this.timeout(60000);
        it("should create bundle", done => {
            let b = browserify();
            b.add("app/main.js");
            b.transform(babelify.configure({
                plugins: [ "transform-object-rest-spread", "recharts", "transform-class-properties" ],
                presets: [ "es2015", "react" ]
            }));
            let readableStream = b.bundle();
            let bundle = "";
            readableStream.on("data", buf => {
                bundle += buf.toString();
            });
            readableStream.on("end", () => {
                const result = UglifyJS.minify(bundle);
                assert.notExists(result.error);
                done();
            });
        });
    });
});