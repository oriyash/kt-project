# Knight's Tour

This is a very sinple implementation of the knight's tour game based on react, react-chessboard and Warnsdorff Heuristic for the autocomplete.

## To use the application online go to [this page](https://knight-tour-91aac.web.app/)

## Run on localhost with Docker

-   First install docker
-   Open a terminal in the project directory (The dir with Dockerfile in it)
-   Run these 2 commands replacing `<host port>` with the port you want the application to run on: <br/>
    `$ docker build -t kt-img .` <br/>
    `$ docker run --name kt-con --rm -d -p <host port>:80 kt-img`
-   After this the application should be running on localhost:`<host port>`
-   use `$ docker stop kt-con` to stop the container
