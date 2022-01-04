# mars-robot

COMMANDS TO RUN 

1 docker-compose up     /* the database is running on a docker i couldn't run the app also because of problems of ne mac m1 arc*/
2 cd backend. /* enter to the backend folder */
3 npm run prisma /* to migrate de models to the db */
4 npm run start /* to run the back end */


localhost:4011/input 
POST
example of body 
{
    "input":"5 3 1 1 E R F F F F F F F F R F L F R F F F F F F F F F F F F F F F 3 2 N F F F F R F F R F L L F F R R F L L 0 3 W L L F F F F F R F L F L"
}
PLEASE ALL SEPARATED WITH SPACES.

localhost:4011/lost-robots
GET
retrieves the information of all lost robots



