// utilities file for functions that can be useful anywhere

// function (from stackoverflow) that converts bigint to a string so that JSON.stringify can work properly
const jsonBigInt = (param) => {
    return JSON.stringify(
      param,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
  };
  export default jsonBigInt;