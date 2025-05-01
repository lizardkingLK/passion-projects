import { Json } from "../types";
import { inDepthAnalyze } from "../utility";
import { Listener } from "./listener";

export class Tracker {
  #listener: Listener;

  constructor() {
    this.#listener = new Listener();
  }

  clearNodes() {
    this.#listener.clearNodes();
  }

  // TODO: set hLevel
  // TODO: set wLevel
  // TODO: set visitor
  setNodes(valueObject: Json) {
    const newNodesResult = inDepthAnalyze(valueObject);

    this.#listener.setNodes(newNodesResult.data!);
  }

  // getCircleConfig(level: number | null): CircleNode {
  //   // TODO: set cordinateX and cordinateY actuals
  //   let config: CircleNode = {
  //     cordinateX: Math.random() * window.innerWidth,
  //     cordinateY: Math.random() * window.innerHeight,
  //     radius: 20,
  //   };

  //   return config;
  // }
}
