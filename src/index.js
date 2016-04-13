import "babel/polyfill";
import router from "kinesis-router";
import mongodb from "services/mongodb";
import * as config from "./config";

export const handler = router()
    .on("element inserted in collection wi6labs-raw-reading", function (event) {
        return mongodb.then(function (db) {
            var wi6labs = db.collection(config.WI6LABS_COLLECTION_NAME);
            return wi6labs.update(
                {_id: event.data.sensorId},
                event.data,
                {upsert:true}
            );
        });
    });
