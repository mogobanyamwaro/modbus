var modbus = require("modbus-stream");

modbus.tcp
  .server({ debug: "server" }, (connection) => {
    connection.readCoils({ address: 5, quantity: 8 }, (err, info) => {
      console.log("this is the server douglas");
      console.log("response", info.response.data);
    });
    // connection.readCoils({ address: 4, quantity: 10 }, (err, info) => {
    //   console.log("second call");
    //   console.log("res 2", info);
    // });
    connection.readDiscreteInputs({ address: 0, quantity: 10 }, (err, inf0) => {
      console.log(inf0);
    });
  })
  .listen(12345, () => {
    modbus.tcp.connect(12345, { debug: "client" }, (err, connection) => {
      connection.on("read-coils", (request, reply) => {
        reply(null, [1, 0, 1, 0, 1, 1, 0, 1]);
      });

      connection.on("readDiscreteInputs", (request, reply) => {
        reply(null, "ooh yes i got you");
      });
    });
  });
