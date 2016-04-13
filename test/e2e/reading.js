import "babel/polyfill";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import {handler} from "index";
import mongodb from "services/mongodb";
import {WI6LABS_COLLECTION_NAME} from "config";
import {getEventFromObject, run} from "../mock";

describe("On wi6labs-reading",  () => {

    var collection;
    var db;
    before(async () => {
        db = await mongodb;
        collection = db.collection(WI6LABS_COLLECTION_NAME);
    });
    after(async () => {
        await db.close();
    });
    beforeEach(async () => {
        await collection.remove({});
    });

    it("inserts an element into the collection if no element is present", async () => {
        const event = getEventFromObject(fakeEvent);
        await run(handler, event);
        var element = await collection.findOne();
        console.log("element", element);
    });

    it("update an element into the collection if element is present", async () => {
        await collection.insert(fakeElement);
        const event = getEventFromObject(fakeEvent);
        await run(handler, event);
        var element = await collection.findOne();
        console.log("element", element);
    });

});

var fakeEvent=  {
    type: "element inserted in collection wi6labs-raw-reading",
    data: {
        "sensorId": "0x00000000AC000004",
        "date": "2016-04-11T09:13:00.000Z",
        "measurements": [
            {
                "type": "Temperature",
                "source": "reading",
                "unitOfMeasurement": "°C",
                "value": 28.9
            },
            {
                "type": "Humidity",
                "source": "reading",
                "unitOfMeasurement": "%",
                "value": 32.32
            },
            {
                "type": "DewPoint",
                "source": "reading",
                "unitOfMeasurement": "°C",
                "value": 10.69
            }
        ]
    }
};

var fakeElement =  {
    "sensorId": "0x00000000AC000004",
    "date": "2016-04-11T09:13:00.000Z",
    "measurements": [
        {
            "type": "Temperature",
            "source": "reading",
            "unitOfMeasurement": "°C",
            "value": 28.9
        },
        {
            "type": "Humidity",
            "source": "reading",
            "unitOfMeasurement": "%",
            "value": 32.32
        },
        {
            "type": "DewPoint",
            "source": "reading",
            "unitOfMeasurement": "°C",
            "value": 10.69
        }
    ]
};
