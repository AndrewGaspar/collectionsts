/// <reference path="../collectionsts.ts" />
/// <reference path="node.d.ts" />

import assert = module("assert");
import c = module("../collectionsts");

var Collection = c.Collection;

declare var describe: (descriptor: string, suite: () => void ) => void;
declare var it: (descriptor: string, test: (done: (err?: any) => void ) => void ) => void;

var id = 0;
class Uniq implements c.IUnique {
    public uid: string = String(id++);
}

describe("Collection", function () {
    it("should contain three items", function () {
        var col = new Collection();
        for(var i = 0; i < 3; i++)
            col.add(new Uniq());
        assert(col.length === 3);
    });

    it("should count 100,000 items", function () {
        var col = new Collection();
        for (var i = 0; i < 1e5; i++) {
            col.add({ i: i });
        }
        
        var j = 0;
        col.forEach(function (elem, id, i) {
            j = i;
        });

        assert.equal(j, 99999);
    });
});