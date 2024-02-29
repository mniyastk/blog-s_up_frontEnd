import React from "react";
import { List } from "immutable";
const Immutable = () => {
  const immutableList = List([1, 3, 4, 5, 6]);
  console.log(immutableList.toArray());
  const uList = immutableList.push(7)
  console.log(uList.toArray())
  console.log(immutableList.get(4))
  console.log(immutableList.toArray())

  return <div>Immutable</div>;
};

export default Immutable;
