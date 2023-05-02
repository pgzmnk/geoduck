import { runQueryDuckDb } from "@/utils/duckdbFunctions";
import * as wkt from "wkt";

export async function createOrReplaceDataset() {}

export const renderMapData = (map, db, tableNames: string) => {
  map.current.on("load", () => {
    const getData = async (tableName: string, geoType: string) => {
      const _data = await runQueryDuckDb(db, `FROM ${tableName};`);
      var objectId = `${geoType}s_${tableName}`;

      if (_data) {
        const data = JSON.parse(_data);

        var geojson = {};
        switch (geoType) {
          case "point":
            geojson = {
              type: "FeatureCollection",
              features: data.map((record) => {
                return {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [record.longitude, record.latitude],
                  },
                  properties: {
                    title: record.name,
                  },
                };
              }),
            };
            if ("type" in geojson) {
              if (!map.current.getSource(objectId)) {
                if (!map.current.hasImage("custom-marker")) {
                  map.current.loadImage(
                    "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
                    (error, image) => {
                      if (error) throw error;
                      map.current.addImage("custom-marker", image);
                      map.current.addSource(objectId, {
                        type: "geojson",
                        data: geojson,
                      });

                      map.current.addLayer({
                        id: objectId,
                        type: "symbol",
                        source: objectId,
                        layout: {
                          "icon-image": "custom-marker",
                          // get the title name from the source's "title" property
                          "text-field": ["get", "title"],
                          "text-font": [
                            "Open Sans Semibold",
                            "Arial Unicode MS Bold",
                          ],
                          "text-offset": [0, 1.25],
                          "text-anchor": "top",
                        },
                      });
                    }
                  );
                }
              }
            }
            break;
          case "polygon":
            // transform data into format for polygon mapbox addSource
            geojson = {
              type: "FeatureCollection",
              features: data.map((record) => {
                return {
                  type: "Feature",
                  geometry: wkt.parse(record.geometry_str),
                  properties: {
                    title: record.name,
                    score: record.score,
                  },
                };
              }),
            };

            if ("type" in geojson) {
              map.current.addSource(objectId, {
                type: "geojson",
                data: geojson,
              });
              map.current.addLayer({
                id: `layer_${objectId}`,
                type: "fill",
                source: objectId,
                paint: {
                  "fill-color": [
                    "interpolate",
                    ["linear"],
                    ["get", "score"],
                    0,
                    "#f6fbfa",
                    100,
                    "#1d483f",
                  ],
                  "fill-outline-color": "#ffc0cb",
                  "fill-opacity": 1,
                },
              });
            }
            break;
          case "h3":
            // to-do
            break;
          default:
            break;
        }
      }
    };
    // to-do: infer geometry column name and geometry type from the table
    getData("cities", "point");
    getData("ent", "polygon");
  });
};
