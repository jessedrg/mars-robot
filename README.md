# mars-robot

COMMANDS TO RUN <br />

1 docker-compose up     /* the database is running on a docker i couldn't run the app also because of problems of ne mac m1 arc*/<br />
2 cd backend. /* enter to the backend folder */<br />
3 npm run prisma /* to migrate de models to the db */<br />
4 npm run start /* to run the back end */<br />


localhost:4011/input <br />
POST<br />
example of body <br />
{<br />
    "input":"5 3 1 1 E R F F F F F F F F R F L F R F F F F F F F F F F F F F F F 3 2 N F F F F R F F R F L L F F R R F L L 0 3 W L L F F F F F R F L F L"<br />
}<br />
PLEASE ALL SEPARATED WITH SPACES.<br />

localhost:4011/lost-robots<br />
GET<br />
retrieves the information of all lost robots<br />



