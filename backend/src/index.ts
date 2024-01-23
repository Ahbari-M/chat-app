import server from "./server";

const serverStartMsg = 'Express server started on port: ',
        port = (process.env.PORT || 3005);

// Start server
server.listen(port, () => {
    console.log(serverStartMsg + port);
});
